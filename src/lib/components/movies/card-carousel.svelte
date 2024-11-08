<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';

	export let movies;
</script>

<div class="px-8">
	<Carousel.Root>
		<Carousel.Content class="items-center">
			{#each movies as movie}
				<Carousel.Item class=" md:basis-1/2 lg:basis-1/3">
					<div class="p-1">
						<div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
								class="h-[400px] w-60 object-cover"
							/>
							<div class="p-4">
								<h2 class="text-xl font-semibold">{movie.title}</h2>
								<p class="mt-2 text-sm text-gray-600">
									{new Date(movie.release_date).toLocaleDateString('pt-BR')}
								</p>
								<div class="mt-2 flex items-center">
									<span class="text-yellow-500">★</span>
									<span class="ml-1">{movie.vote_average.toFixed(1)}</span>
								</div>
							</div>
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
