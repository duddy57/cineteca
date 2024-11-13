<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { EyeIcon, EyeOff, LoaderCircle } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { Separator } from '$lib/components/ui/separator';
	import { loginSchema, type LoginSchema } from '$lib/schema';
	import { browser } from '$app/environment';

	let { data }: { data: SuperValidated<Infer<LoginSchema>> } = $props();

	let loading = $state(false);

	const form = superForm(data, {
		validators: zodClient(loginSchema),
		onUpdated: ({ form: f }) => {
			loading = true;
			if (f.valid) {
				loading = false;
				toast.success('Login feito com sucesso!');
			} else {
				loading = false;
				toast.error('Erro ao fazer login!');
			}
			loading = false;
		}
	});

	const { form: formData, enhance } = form;

	let passIsVisible = $state(false);
</script>

<form method="post" action="?/login" use:enhance>
	<Form.Field {form} name="emailOrUsername">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.emailOrUsername} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Senha</Form.Label>
				<div class="relative">
					<Input
						{...props}
						bind:value={$formData.password}
						type={passIsVisible ? 'text' : 'password'}
					/>
					<button
						type="button"
						onclick={() => {
							passIsVisible = !passIsVisible;
						}}
						class="absolute right-3 top-1/2 -translate-y-1/2"
					>
						{#if passIsVisible}
							<EyeIcon class="h-4 w-4" />
						{:else}
							<EyeOff class="h-4 w-4" />
						{/if}
					</button>
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class={'w-full items-center'} disabled={loading}>
		{#if loading}
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		Entrar
	</Form.Button>
</form>
<div class="flex flex-col gap-4 pt-4">
	<Separator />
	<p class="px-8 text-center text-sm text-muted-foreground">
		Ao clicar em entrar, você concorda com nossos
		<a href="/terms" class="underline underline-offset-4 hover:text-primary">
			Termos de Serviços
		</a>
		e
		<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
			Politica de privacidade
		</a>
		.
	</p>
</div>
