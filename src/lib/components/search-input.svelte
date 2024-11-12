<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';

	export let movies: { value: string; label: string }[];
	let open = false;
	let value = '';
	let triggerRef: HTMLButtonElement = null!;

	$: selectedValue = movies.find((m) => m.value === value)?.label;
	let searchQuery = '';
	let filteredMovies = movies;

	function filterMovies() {
		filteredMovies = movies.filter((m) =>
			m.label.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			if (triggerRef) {
				triggerRef.focus();
			}
		});
	}

	function handleSearch(event: CustomEvent<string>) {
		searchQuery = event.detail;
		filterMovies();
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger class="w-full" bind:ref={triggerRef}>
		<Button variant="outline" class="w-full justify-between" role="combobox" aria-expanded={open}>
			{selectedValue || 'Busque um filme...'}
			<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-full p-0">
		<Command.Root class="w-full overflow-hidden rounded-md bg-popover p-0">
			<Command.Input
				class="w-full"
				placeholder="Busque um filme..."
				bind:value={searchQuery}
				oninput={filterMovies}
			/>
			<Command.List class="w-full">
				<Command.Empty>Nenhum filme encontrado.</Command.Empty>
				<Command.Group>
					{#each filteredMovies as movie}
						<Command.Item
							value={movie.value}
							onSelect={() => {
								value = movie.value;
								closeAndFocusTrigger();
							}}
						>
							<Check class={cn('mr-2 size-4', value !== movie.value && 'text-transparent')} />
							{movie.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
