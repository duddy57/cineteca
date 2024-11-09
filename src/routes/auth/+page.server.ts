import * as auth from '$lib/server/auth';
import * as table from '$lib/server/db/schema';

import { hash, verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { loginSchema, registerSchema } from '$lib/schema';
import { zod } from "sveltekit-superforms/adapters";
import { encodeBase32LowerCase } from '@oslojs/encoding';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}

	const formLogin = await superValidate(zod(loginSchema))
	return {
		formLogin
	};
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, password } = form.data;


		if (!validateUsername(username)) {
			return fail(400, { message: 'Username invalido' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Senha invalida' });
		}

		const results = await db.select().from(table.user).where(eq(table.user.username, username));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Senha ou username Invalido, talvez você não tenha uma conta?' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, { message: 'Senha ou username incorretos' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/');
	},
	register: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, email, password, date_of_birth } = form.data;

		if (!validateEmail(email)) {
			return fail(400, { message: 'Email invalido' });
		}

		if (!validadeDate(date_of_birth)) {
			return fail(400, { message: 'Data invalida' });
		}

		if (!validateUsername(username)) {
			return fail(400, { message: 'Username invalido' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Senha invalida' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({ id: userId, username, email, date_of_birth, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			return {
				form,
				redirect: true
			}
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'Erro ao criar conta' });
		}
		return redirect(302, '/');
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

function validadeDate(date: unknown): date is string {
	return typeof date === 'string' && date.length === 10;
}

function validateEmail(email: unknown): email is string {
	return typeof email === 'string' && email.length >= 3 && email.length <= 254;
}

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
