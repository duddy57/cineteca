<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Popover from '$lib/components/ui/popover';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today,
		type DateValue
	} from '@internationalized/date';
	import { buttonVariants } from '$lib/components/ui/button';

	import CalendarYear from '$lib/components/calendarYear.svelte';
	import { CalendarIcon, EyeIcon, EyeOff, LoaderCircle } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { registerSchema, type RegisterSchema } from '$lib/schema';
	import { toast } from 'svelte-sonner';
	import { Separator } from '$lib/components/ui/separator';

	let { data }: { data: SuperValidated<Infer<RegisterSchema>> } = $props();

	let loading = $state(false);

	const form = superForm(data, {
		validators: zodClient(registerSchema),
		onUpdated: ({ form: f }) => {
			loading = true;
			if (f.valid) {
				loading = false;
				toast.success('Cadastro feito com sucesso!');
			} else {
				loading = false;
				toast.error('Erro ao fazer cadastro!');
			}
			loading = false;
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

	let passIsVisible = $state(false);
</script>

<form method="post" action="?/register" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.username} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="date_of_birth" class="flex flex-col">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Data de nascimento</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						{...props}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-full justify-start pl-4 text-left font-normal',
							!value && 'text-muted-foreground'
						)}
					>
						{value ? df.format(value.toDate(getLocalTimeZone())) : 'Selecione uma data'}
						<CalendarIcon class="ml-auto size-4 opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<CalendarYear
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
		Registrar-se
	</Form.Button>
</form>
<div class="flex flex-col gap-4 pt-4">
	<Separator />
	<p class="px-8 text-center text-sm text-muted-foreground">
		Ao clicar em registrar-se, você concorda com nossos
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
