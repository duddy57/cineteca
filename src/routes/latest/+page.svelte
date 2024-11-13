<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { Star } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import Autoplay from 'embla-carousel-autoplay';

	import type { PageData } from './$types';

	export let data: PageData;

	const { movies } = data;
</script>

<main class="h-full w-full">
	<div
		class="mx-4 mb-4 flex flex-col items-center justify-center gap-4 rounded-lg border p-4 shadow-xl shadow-purple-900 md:mx-[40%]"
	>
		<h2 class="text-xl font-semibold tracking-tighter">Últimos lançamentos</h2>
	</div>
	<Carousel.Root
		plugins={[
			Autoplay({
				delay: 4000
			})
		]}
	>
		<Carousel.Content>
			{#each movies as item (item.id)}
				<Carousel.Item class="gap-4 p-1 md:basis-1/3">
					<div class="relative w-full overflow-hidden rounded-lg pl-4 md:aspect-[4/5]">
						<img
							src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
							alt={`Poster para o filme: ${item.title}`}
							loading="lazy"
							class="object-cover transition-transform duration-300 hover:scale-105"
						/>
						<div
							class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 px-6 text-white backdrop-blur-md"
						>
							<h3 class="truncate font-semibold">{item.title}</h3>
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous class="absolute left-0 top-1/2 -translate-y-1/2" />
		<Carousel.Next class="absolute right-0 top-1/2 -translate-y-1/2" />
	</Carousel.Root>
</main>
