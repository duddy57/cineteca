<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';

	import imgLogin from '$lib/assets/imgLogin.svg';
	import type { PageData } from './$types';
	import RegisterForm from './RegisterForm.svelte';
	import LoginForm from './LoginForm.svelte';

	export let data: PageData;

	let { loginForm, registerForm } = data;
</script>

<main class="flex h-auto w-full flex-col items-center justify-center gap-4 p-4 md:flex-row">
	<div class="hidden w-full flex-col items-center justify-center md:flex md:h-full">
		<img src={imgLogin} alt="Login" />
		<a class="text-xs text-muted-foreground/20" href="https://storyset.com/media"
			>Media illustrations by Storyset</a
		>
	</div>
	<section
		class=" flex h-full w-full flex-col items-center justify-center gap-4 rounded-t-lg border p-6 md:border-none"
	>
		<div class="h-full lg:p-8">
			<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div>
					<Tabs.Root value="signIn" class="w-full">
						<Tabs.List class="w-full">
							<Tabs.Trigger class="w-full" value="signIn">Entrar</Tabs.Trigger>
							<Tabs.Trigger class="w-full" value="signUp">Registrar</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="signIn">
							<LoginForm data={loginForm} />
						</Tabs.Content>
						<Tabs.Content value="signUp">
							<RegisterForm data={registerForm} />
						</Tabs.Content>
					</Tabs.Root>
				</div>
			</div>
		</div>
	</section>
</main>
