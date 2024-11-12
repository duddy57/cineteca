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
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import debounce from 'debounce';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	const franquias = [
		'Star Wars',
		'Marvel',
		'Harry Potter',
		'007',
		'Senhor dos anéis',
		'Velozes e furiosos',
		'Jurassic Park',
		'DC Comics',
		'Piratas do caribe',
		'Transformers',
		'Missão: Impossível',
		'The Hunger Games',
		'Toy Story',
		'Homem aranha',
		'X-Men',
		'Shrek',
		'Batman',
		'Indiana Jones',
		'Exterminador',
		'Matrix'
	];

	const { movies, user, movieSe } = data;

	if (user?.username) {
		userStore.set({ username: user.username });
	}

	if (movies) {
		moviesStore.set(data.movies);
	}

	let searchQuery = '';
	let res: any[] = [];
	let loading = false;

	const debouncedSearch = debounce(async (term: string) => {
		if (term.length < 2) {
			res = [];
			return;
		}

		loading = true;
		try {
			const response = await fetch(`/api/search?query=${encodeURIComponent(term)}`);
			res = await response.json();
		} catch (err) {
			toast.error('Erro ao buscar filmes', {
				description: 'Ocorreu um erro ao buscar os filmes. Por favor, tente novamente mais tarde.',
				duration: 5000
			});
			console.error('Erro na busca', err);
			res = [];
		}
		loading = false;
	}, 300);

	$: {
		if (searchQuery) {
			debouncedSearch(searchQuery);
		} else {
			res = [];
		}
	}

	function formatNote(vote) {
		if (vote >= 8) return 'text-green-500'; // Alta avaliação
		if (vote >= 5) return 'text-yellow-500'; // Avaliação média
		return 'text-red-500'; // Avaliação baixa
	}
</script>

<div class="flex w-full flex-col md:p-8">
	<main class=" container flex-1 gap-4">
		<section
			class=" animated-bg flex h-96 flex-col items-center justify-center rounded-t-lg md:w-full"
		>
			<div class="mb-8 flex w-auto flex-col items-center justify-center gap-4 md:w-full">
				<div class="relative w-full md:max-w-6xl">
					<Input
						type="text"
						placeholder="Buscar filme..."
						class="h-14 rounded-lg py-4 pl-12 pr-4 text-lg md:w-full md:rounded-l-lg"
						bind:value={searchQuery}
					/>
					<Search
						class="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-gray-400 hover:scale-105"
					/>
				</div>
			</div>
			<div class="p-2 text-center">
				<p class="mt-4 text-base font-medium text-white">
					Ainda não sabe qual filme você quer? Explore nossa seleção!
				</p>
				<Button
					class="mt-4 rounded-lg bg-purple-900 px-6 py-3 text-lg text-white hover:bg-purple-800"
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
		{#if loading}
			<div class="text-center font-bold">Carregando...</div>
		{:else if res.length > 0}
			<div class="space-y-4">
				{#each res as movie}
					<div class="flex items-center gap-4 rounded-lg border p-4">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							class="h-46 w-40"
							loading="lazy"
							alt={movie.title}
						/>
						<div class="flex flex-col">
							<h2 class="text-lg font-bold">{movie.title}</h2>
							<p class="text-sm text-gray-600">
								Ano de lançamento: {new Date(movie.release_date).getFullYear()}
								- Nota: {movie.vote_average}
								<Sparkles class="inline-block h-4 w-4 text-yellow-500" />
							</p>
							<p class="mt-2">{movie.overview || 'Sem descrição disponível'}</p>
						</div>
					</div>
				{/each}
			</div>
		{:else if searchQuery.length > 1}
			<div class="text-center">Nenhum resultado encontrado</div>
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
		animation: scroll 40s linear infinite;
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
