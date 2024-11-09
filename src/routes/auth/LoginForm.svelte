<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { loginSchema } from '$lib/schema';
	import { EyeIcon, EyeOff } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	const formRegister = $props();

	const form = superForm(formRegister, {
		validators: zodClient(loginSchema),
		dataType: 'json',
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Login feito com sucesso!');
			} else {
				toast.error('Erro ao fazer login!');
			}
		}
	});

	let login: boolean = true;
	let passwordVisible = $state(false);
	const { form: formData, enhance } = form;
</script>

<Card.Root class="flex flex-col justify-center border-none">
	<Card.Header class="flex flex-col items-center justify-center gap-4">
		<Card.Title class="text-2xl font-bold">Entrar</Card.Title>
		<Card.Description>Preencha os campos para entrar na sua conta</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col border-none">
		<form method="post" class="flex flex-col" action="?/login" use:enhance>
			<Form.Field {form} name="username">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Username</Form.Label>
						<Input {...props} bind:value={$formData.username} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Senha</Form.Label>
						<div class="relative flex">
							<Input
								{...props}
								bind:value={$formData.password}
								class="w-full"
								type={passwordVisible ? 'text' : 'password'}
							/>
							<Button
								class="absolute right-0 top-0 h-full"
								type="button"
								onclick={() => (passwordVisible = !passwordVisible)}
							>
								{#if passwordVisible}
									<EyeOff class="h-4 w-4" />
								{:else}
									<EyeIcon class="h-4 w-4" />
								{/if}
							</Button>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="mt-4 w-full items-center justify-center">Entrar</Form.Button>
		</form>
	</Card.Content>
	<div class="mx-20 mx-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<Separator />
		OU
		<Separator />
	</div>
</Card.Root>
