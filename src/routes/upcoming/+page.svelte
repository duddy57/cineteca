<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';

	import type { PageData } from './$types';

	export let data: PageData;

	const { upcomingMovie } = data;
</script>

<div class="h-full w-full">
	<Card.Root
		class="mx-4 mb-4 flex flex-col items-center justify-center gap-4 rounded-lg border p-4 shadow-xl shadow-purple-900"
	>
		<Card.Header>
			<Card.Title>Em breve</Card.Title>
			<Card.Description>
				Os filmes que em breve estarão disponíveis em nosso catalogo
			</Card.Description>
		</Card.Header>
		<Card.Content class="mx-10">
			<Carousel.Root
				plugins={[
					Autoplay({
						delay: 4000
					})
				]}
			>
				<Carousel.Content>
					{#each upcomingMovie as item (item.id)}
						<Carousel.Item class="gap-4 p-1 md:basis-1/3">
							<div class="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
								<img
									src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
									alt={`Poster para o filme: ${item.title}`}
									loading="lazy"
									class="object-cover transition-transform duration-300 hover:scale-105"
								/>
								<div
									class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 px-6 text-white backdrop-blur-md"
								>
									<h3 class="truncate font-semibold shadow-xl">{item.title}</h3>
								</div>
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Previous />
				<Carousel.Next />
			</Carousel.Root>
		</Card.Content>
	</Card.Root>
</div>
