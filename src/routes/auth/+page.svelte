<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	import { type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type LoginSchema, type RegisterSchema } from '$lib/schema';
	import { Button } from '$lib/components/ui/button';
	import RegisterForm from './RegisterForm.svelte';
	import imgLogin from '$lib/assets/imgLogin.svg';
	import LoginForm from './LoginForm.svelte';

	export let formLogin: SuperValidated<Infer<LoginSchema>>;
	export let formRegister: SuperValidated<Infer<RegisterSchema>>;

	let login: boolean = true;
</script>

<main class="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
	<div class="hidden w-full flex-col items-center justify-center md:flex md:h-full">
		<img src={imgLogin} alt="Login" />
		<a class="text-xs text-muted-foreground/20" href="https://storyset.com/media"
			>Media illustrations by Storyset</a
		>
	</div>
	<section class="flex w-full flex-col items-center justify-center gap-4 md:h-full">
		<Card.Root class="h-full w-full">
			<Card.Header>
				<Button variant="outline" onclick={() => (login = !login)}>
					{#if login}
						Registrar-se
					{:else}
						Entrar
					{/if}
				</Button>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4 md:h-full">
				{#if login}
					<div class="flex flex-col gap-4 md:h-[80%]">
						<LoginForm form={formLogin} />
					</div>
				{:else}
					<div class="flex flex-col gap-4 md:h-full">
						<RegisterForm form={formRegister} />
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</section>
</main>
