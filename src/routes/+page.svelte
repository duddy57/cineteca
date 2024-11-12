<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	import { moviesStore } from '$lib/stores/moviesStore.js';
	import { userStore } from '$lib/stores/userStore.js';
	import type { PageData } from './$types';

	import { Button } from '$lib/components/ui/button';

	import { Input } from '$lib/components/ui/input';
	import { Search, Sparkles } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { DateFormatter, toLocalTimeZone } from '@internationalized/date';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { text } from '@sveltejs/kit';

	export let data: PageData;

	const franquias = [
		'Star Wars',
		'Marvel',
		'Harry Potter',
		'007',
		'The Lord of the Rings',
		'Fast & Furious',
		'Jurassic Park',
		'DC Comics',
		'Piratas do caribe',
		'Transformers',
		'Missão: Impossível',
		'The Hunger Games',
		'Toy Story',
		'Home aranha',
		'X-Men',
		'Shrek',
		'Batman',
		'Indiana Jones',
		'Exterminador',
		'The Matrix'
	];

	const { movies, user, movieSe } = data;

	if (user?.username) {
		userStore.set({ username: user.username });
	}

	if (movies) {
		moviesStore.set(data.movies);
	}

	let searchQuery = $page.url.searchParams.get('query') || '';
	let selectedMovie: any = null;
	let isDialogOpen = false;

	async function searchMovies() {
		if (searchQuery.trim() === '') return;
		await goto(`?query=${encodeURIComponent(searchQuery)}`, { keepFocus: true });
	}

	function closeDialog() {
		isDialogOpen = false;
	}

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') closeDialog();
		});
	});

	function formatNote(vote) {
		if (vote >= 8) return 'text-green-500'; // Alta avaliação
		if (vote >= 5) return 'text-yellow-500'; // Avaliação média
		return 'text-red-500'; // Avaliação baixa
	}
</script>

<div class="flex w-full flex-col md:p-8">
	<main class=" container flex-1 gap-4">
		<section
			class=" animated-bg flex h-96 w-full flex-col items-center justify-center rounded-t-lg"
		>
			<div class="mb-8 flex flex-col items-center justify-center gap-4">
				<div class="relative w-full md:max-w-6xl">
					<Input
						type="text"
						placeholder="Buscar filme..."
						class="rounded-lg py-4 pl-12 pr-4 text-lg md:w-full md:rounded-l-lg"
						bind:value={searchQuery}
					/>
					<Search
						class="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-gray-400 hover:scale-105"
					/>
				</div>
				<Button
					class="w-full rounded-lg bg-purple-900 px-6 py-3 text-lg text-white hover:bg-purple-800 md:rounded-r-lg "
					onclick={searchMovies}
				>
					Buscar
				</Button>
			</div>
			<div class="p-2 text-center">
				<p class="mt-4 text-base font-medium text-white">
					Ainda não sabe qual filme você quer? Explore nossa seleção!
				</p>
				<Button
					class="rounded-lg bg-purple-900 px-6 py-3 text-lg text-white hover:bg-purple-800"
					onclick={() => {
						goto('/latest');
					}}
				>
					Explorar Filmes
				</Button>
			</div>
		</section>
		<section
			class="hidden w-full overflow-hidden rounded-b-lg bg-primary-foreground/60 py-12 md:container md:flex"
		>
			<div
				class=" animate-scroll hover:pause hidden whitespace-nowrap hover:cursor-pointer md:flex"
				aria-label="Maiores franquias de filmes"
			>
				{#each [...franquias, ...franquias] as f, i (i)}
					<span class="mx-4 text-2xl font-bold uppercase italic text-muted-foreground/50">
						{f}
					</span>
				{/each}
			</div>
		</section>
	</main>
</div>

{#if searchQuery}
	<section class="container mx-auto w-full rounded-lg border px-4 py-8 shadow-lg">
		{#if movies.length > 0}
			<div class="grid grid-cols-2 gap-4 md:grid-cols-6">
				{#each movieSe as m (m.id)}
					<Dialog.Root>
						<Dialog.Trigger>
							<div
								class="shadow-xl hover:scale-105 hover:cursor-pointer hover:shadow-2xl hover:shadow-purple-900 hover:transition-all hover:duration-300"
							>
								<div>
									<img
										src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
										alt={`Poster para o filme: ${m.title}`}
									/>
								</div>
								<div class="bg-primary-foreground/50 p-6">
									<h1 class="text-lg font-bold">{m.title}</h1>
								</div>
							</div>
						</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>{m.title}</Dialog.Title>
								<Dialog.Description>
									<div class="flex w-full items-center justify-between gap-4 py-4">
										<div class="w-fulls flex flex-col gap-4">
											<img
												src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
												alt={`Poster para o filme: ${m.title}`}
												class="w-42 h-48"
											/>
										</div>
										<div class="flex w-full flex-col gap-4">
											<div class="w-60">
												<span class="text-sm text-muted-foreground">
													{m.overview || 'Descrição não disponível.'}
												</span>
											</div>
											<Separator />
											<div class="flex items-center justify-between gap-4">
												<div>
													<p>
														<span class="text-sm text-muted-foreground">
															Ano de lançamento:
															{m.release_date || 'Data não disponível.'}
														</span>
													</p>
												</div>
												<div class="flex flex-row items-center justify-between gap-4">
													<span class="text-muted-foregroun flex items-center gap-2">
														Nota:
														<p class={`text-lg font-semibold ${formatNote(m.vote_average)}`}>
															{m.vote_average}
														</p>
														<Sparkles class="h-4 w-4 text-yellow-500" />
													</span>
												</div>
											</div>
										</div>
									</div>
								</Dialog.Description>
							</Dialog.Header>
						</Dialog.Content>
					</Dialog.Root>
				{/each}
			</div>
		{:else}
			<div class="flex flex-col items-center">
				<h1 class="text-4xl font-bold text-white">
					Nenhum filme encontrado para "{searchQuery}"
				</h1>
			</div>
		{/if}
	</section>
{/if}

<!-- Animações -->
<style>
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.animate-scroll {
		animation: scroll 30s linear infinite;
	}

	.hover\:pause:hover {
		animation-play-state: paused;
	}

	@keyframes gradientAnimation {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.animated-bg {
		background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 400% 400%;
		animation: gradientAnimation 15s ease infinite;
	}
</style>
