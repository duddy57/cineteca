<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { Star } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import Autoplay from 'embla-carousel-autoplay';

	export let movies;
</script>

<div class="h-auto w-full px-4 sm:px-6 lg:px-8">
	<Carousel.Root
		class="h-auto w-full"
		plugins={[
			Autoplay({
				delay: 4000
			})
		]}
	>
		<Carousel.Content>
			{#each movies as movie (movie.id)}
				<Carousel.Item class="mb-4 p-4 md:basis-2/5 lg:basis-2/6">
					<div class="h-full">
						<div
							class="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
						>
							<div class="relative aspect-[4/5] w-full overflow-hidden">
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
								/>
								<div
									class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
								>
									<h2 class="line-clamp-2 text-lg font-semibold text-white shadow-lg">
										{movie.title}
									</h2>
									<p class="line-clamp-3 text-sm text-gray-300">
										{movie.overview}
										<span class="text-sm text-gray-400">
											{movie.vote_average.toFixed(1)}
										</span>
										<span class="text-sm text-gray-400">
											{movie.vote_count}
										</span>
									</p>
								</div>
							</div>
							<div class="flex flex-1 flex-col justify-between p-4">
								<div>
									<p class="text-sm text-gray-600 dark:text-gray-400">
										{new Date(movie.release_date).toLocaleDateString('pt-BR')}
									</p>
									<div class="mt-2 flex items-center">
										<Star class="h-4 w-4 text-yellow-500" />
										<span class="ml-1 text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
									</div>
								</div>
								<Button variant="outline" size="sm" class="mt-4 w-full">Ver detalhes</Button>
							</div>
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous class="hidden md:flex" />
		<Carousel.Next class="hidden md:flex" />
		<div class="mt-4 flex justify-center gap-2">
			<Carousel.Previous class="relative left-0 translate-x-0 md:hidden " />
			<Carousel.Next class="relative right-0 translate-x-0 md:hidden" />
		</div>
	</Carousel.Root>
</div>
