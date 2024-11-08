<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { loginSchema } from '$lib/schema';
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
	const { form: formData, enhance } = form;
</script>

<Card.Root class="border-none">
	<Card.Header class="flex flex-row items-center justify-between">
		<Card.Title>Entrar</Card.Title>
		<Card.Description>Preencha os campos para entrar na sua conta</Card.Description>
	</Card.Header>
	<Card.Content class="border-none">
		<form method="post" action="?/login" use:enhance>
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
						<Input {...props} bind:value={$formData.password} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Entrar</Form.Button>
		</form>
	</Card.Content>
	<div class="mx-20 mx-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<Separator />
		OU
		<Separator />
	</div>
</Card.Root>
