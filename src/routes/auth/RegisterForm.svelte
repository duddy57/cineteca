<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Popover from '$lib/components/ui/popover';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { registerSchema, type RegisterSchema } from '$lib/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import CalendarYear from '$lib/components/calendarYear.svelte';
	import { CalendarIcon, EyeIcon, EyeOff } from 'lucide-svelte';
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';
	import { cn } from '$lib/utils';

	const formRegister = $props();

	const form = superForm(formRegister, {
		validators: zodClient(registerSchema),
		dataType: 'json',
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Registro feito com sucesso!');
			} else {
				toast.error('Erro ao fazer registro!');
			}
		}
	});

	const { form: formData, enhance } = form;

	const df = new DateFormatter('pt-BR', {
		dateStyle: 'long'
	});

	let value = $state<DateValue | undefined>();

	$effect(() => {
		value = $formData.date_of_birth ? parseDate($formData.date_of_birth) : undefined;
	});

	let placeholder = $state<DateValue>(today(getLocalTimeZone()));
	let passwordVisible = $state(false);
</script>

<Card.Root class="border-none">
	<Card.Header class="flex flex-col items-center justify-center gap-4">
		<Card.Title class="text-2xl font-bold">Registrar-se</Card.Title>
		<Card.Description>Preencha os campos para criar uma conta</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="post" action="?/register" use:enhance>
			<Form.Field {form} name="username">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Username</Form.Label>
						<Input {...props} bind:value={$formData.username} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="date_of_birth" class="flex w-full flex-col">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Data de nascimento</Form.Label>
						<Popover.Root>
							<Popover.Trigger
								{...props}
								class={cn(
									buttonVariants({ variant: 'outline' }),
									'w-[270px] justify-start pl-4 text-left font-normal md:w-full',
									!value && 'text-muted-foreground'
								)}
							>
								{value ? df.format(value.toDate(getLocalTimeZone())) : 'Selecione uma data'}
								<CalendarIcon class="ml-auto size-4 opacity-50" />
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="right">
								<CalendarYear
									locale="pt-BR"
									type="single"
									value={value as DateValue}
									bind:placeholder
									minValue={new CalendarDate(1900, 1, 1)}
									maxValue={today(getLocalTimeZone())}
									calendarLabel="Data de nascimento"
									onValueChange={(v) => {
										if (v) {
											$formData.date_of_birth = v.toString();
										} else {
											$formData.date_of_birth = '';
										}
									}}
								/>
							</Popover.Content>
						</Popover.Root>
						<Form.FieldErrors />
						<input hidden value={$formData.date_of_birth} name={props.name} />
					{/snippet}
				</Form.Control>
			</Form.Field>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
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
			<Form.Button class="mt-4 w-full items-center">Entrar</Form.Button>
		</form>
	</Card.Content>
</Card.Root>
