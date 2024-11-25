import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq, or } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema, registerSchema } from '$lib/schema';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {
		loginForm: await superValidate(zod(loginSchema)),
		registerForm: await superValidate(zod(registerSchema))
	};
};
export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { emailOrUsername, password } = form.data;

		if (!emailOrUsername || !password) {
			return fail(400, { message: 'Ops, o campo de usuário ou senha está vazio' });
		}

		if (!validatePassword(password)) {
			return fail(400, { message: 'Senha invalida' });
		}

		const results = await db.select().from(table.user).where(or(eq(table.user.username, emailOrUsername), eq(table.user.email, emailOrUsername)));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Username ou email incorreto, talvez você queira criar uma conta?' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, { message: 'Email, senha ou usuário incorreto' });
		}

		if (existingUser) {
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, existingUser.id);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			return {
				form
			};
		}


	},

	register: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, email, date_of_birth, password } = form.data;

		if (!validateUsername(username)) {
			return fail(400, { form });
		}


		if (!validateEmail(email)) {
			return fail(400, { form });
		}


		if (!validatePassword(password)) {
			return fail(400, { form });
		}

		const existingUser = await verifierUser(username);
		if (existingUser) {
			return fail(400, { form });
		}

		const hashedPassword = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			const user = await db.insert(table.user).values({
				id: generateUserId(),
				username,
				email,
				date_of_birth,
				passwordHash: hashedPassword
			}).returning();

			if (user) {
				const sessionToken = auth.generateSessionToken();
				const session = await auth.createSession(sessionToken, user[0].id);
				auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
				return {
					form
				};
			}
			return {
				form
			};
		} catch (error) {
			console.error('Error:', error);
			return fail(500, { form });
		}
	}
}
function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

function validateUsername(emailOrUsername: unknown): emailOrUsername is string {
	return (
		typeof emailOrUsername === 'string' &&
		emailOrUsername.length >= 3 &&
		emailOrUsername.length <= 31 &&
		/^[a-z0-9_-]+$/.test(emailOrUsername)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

function validateEmail(email: unknown): email is string {
	return typeof email === 'string' && email.length >= 3 && email.length <= 255;
}

async function verifierUser(emailOrUsername: string): Promise<boolean> {
	const results = await db.select()
		.from(table.user)
		.where(
			or(eq(table.user.username, emailOrUsername), eq(table.user.email, emailOrUsername))
		);
	const existingUser = results.at(0);
	return existingUser ? true : false;
}