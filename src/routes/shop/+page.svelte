<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';

	import comboG from '$lib/assets/combo-g.png';
	import comboM from '$lib/assets/combo-m.png';
	import comboP from '$lib/assets/combo-p.png';
	import { writable } from 'svelte/store';

	const data = [
		{
			name: 'Balde Refil caramelo + 2 Bebidas G',
			oldPrice: 'R$ 100,00',
			newPrice: 'R$ 81,00',
			image: comboG,
			description: 'Um balde de pipoca com sabor caramelo e duas bebidas grandes.',
			value: '1'
		},
		{
			name: 'Pipoca Media Refil Manteiga  + 2 Bebidas M',
			price: 'R$ 50,00',
			image: comboM,
			description: 'Pipoca média com sabor manteiga e duas bebidas médias.',
			value: '2'
		},
		{
			name: 'Combo Grande Refil Manteiga',
			price: 'R$ 30,00',
			image: comboP,
			description: 'Combo grande de pipoca com sabor manteiga.',
			value: '3'
		}
	];

	let selectedCombo = writable(data[0]);
	let expandedItem = writable(null);

	function selectCombo(
		combo:
			| {
					name: string;
					oldPrice: string;
					newPrice: string;
					image: string;
					description: string;
					value: string;
					price?: undefined;
			  }
			| {
					name: string;
					price: string;
					image: string;
					description: string;
					value: string;
					oldPrice?: undefined;
					newPrice?: undefined;
			  }
	) {
		selectedCombo.set(combo);
		expandedItem.set(null);
	}
</script>

<main class="container px-4 py-8">
	<h1 class="mb-6 text-center text-3xl font-bold">Combos</h1>
	<div class="flex flex-col justify-center gap-4 p-4 md:flex-row">
		<div class="w-full md:w-1/4">
			<div class="overflow-hidden rounded-lg bg-white shadow-lg">
				<img
					src={$selectedCombo.image}
					alt={$selectedCombo.name}
					class="h-auto w-full object-cover"
				/>
			</div>
		</div>
		<div class="w-full md:w-1/2">
			<div>
				{#each data as item}
					<Accordion.Root type="single">
						<Accordion.Item value={item.value}>
							<Accordion.Trigger
								onclick={() => {
									selectCombo(item);
								}}>{item.name}</Accordion.Trigger
							>
							<Accordion.Content>
								<p>{item.description}</p>
								<div class="flex items-center gap-4">
									<p class="text-sm text-red-500 line-through">{item.oldPrice}</p>
									<p class="text-lg font-bold text-green-500">{item.newPrice}</p>
								</div>
								<p class="text-lg font-bold">{item.price}</p>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				{/each}
			</div>
		</div>
	</div>
</main>
