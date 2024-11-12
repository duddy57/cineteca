<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';

	import type { PageData } from './$types';

	export let data: PageData;

	const { upcomingMovie } = data;
</script>

<div class="p-4">
	<Card.Root>
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
					{#each data.upcomingMovie as item (item.id)}
						<Carousel.Item class="gap-4 p-1 md:basis-1/3">
							<div class="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
								<img
									src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
									alt={`Poster for ${item.title}`}
									loading="lazy"
									class="object-cover transition-transform duration-300 hover:scale-105"
								/>
								<div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 text-white">
									<h3 class="truncate text-sm font-semibold">{item.title}</h3>
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
