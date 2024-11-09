<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Sparkle, Sparkles } from 'lucide-svelte';

	export let data;

	const { latestMovie } = data;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Favoritos</Card.Title>
		<Card.Description>Os filmes favoritos da galera</Card.Description>
	</Card.Header>

	<Card.Content class="border- grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
		{#each latestMovie as movie (movie.id)}
			<div class="flex flex-col gap-2 rounded-xl border p-2">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
				<Dialog.Root>
					<Dialog.Trigger class="bg-background/10 font-semibold md:text-xl"
						>{movie.title}</Dialog.Trigger
					>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title class=" flex w-full items-center p-2 text-center"
								>{movie.title}</Dialog.Title
							>
							<Dialog.Description>
								<div class="flex gap-2">
									<div>
										<img
											src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
											alt={movie.title}
											class="h-auto w-full object-cover"
										/>
									</div>
									<div class="flex flex-col gap-2 rounded-lg border p-4">
										<span class="font-bold">
											{movie.overview}
										</span>
										<div class="flex items-center gap-2">
											Data de lançamento: {movie.release_date}
											<div class="flex items-center gap-2">
												{movie.vote_average}
												<Sparkles class="ml-auto size-4 text-yellow-500" />
											</div>
										</div>
									</div>
								</div>
							</Dialog.Description>
						</Dialog.Header>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		{/each}
	</Card.Content>
</Card.Root>
