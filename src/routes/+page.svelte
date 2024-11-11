<script lang="ts">
	import CardMain from '$lib/components/movies/card-main.svelte';
	import SidebarMain from '$lib/components/sidebar/sidebar-main.svelte';
	import * as Card from '$lib/components/ui/card';
	import { moviesStore } from '$lib/stores/moviesStore.js';
	import { newsStore } from '$lib/stores/newsStore.js';
	import { userStore } from '$lib/stores/userStore.js';
	import type { PageData } from './$types';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import CardFavMain from '$lib/components/movies/favorite/card-fav-main.svelte';
	export let data: PageData;

	const { movies, user, news } = data;

	if (user?.username) {
		userStore.set({ username: user.username });
	}

	if (news) {
		newsStore.set(data.news);
	}

	if (movies) {
		moviesStore.set(data.movies);
	}
</script>

{#await data}
	<Skeleton class="h-full w-full rounded-full" />
{:then data}
	<div class="md: flex h-full w-full flex-col gap-4 md:flex-row">
		<div class="hidden h-auto flex-col items-center md:flex">
			<SidebarMain {data} />
		</div>
		<section class="flex w-full flex-col gap-4" id="latest">
			<Card.Root class="h-full md:h-[80%] md:w-[85%] md:shadow-lg md:shadow-purple-900">
				<Card.Header>
					<Card.Title>Filmes em cartaz</Card.Title>
					<Card.Description>Os filmes em cartaz durante esse mês</Card.Description>
				</Card.Header>
				<Card.Content>
					<CardMain {data} />
				</Card.Content>
			</Card.Root>
		</section>
	</div>
{:catch error}
	<span>Error: {error.message}</span>
{/await}
