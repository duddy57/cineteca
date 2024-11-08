<script lang="ts">
	import CardMain from '$lib/components/movies/card-main.svelte';
	import SidebarMain from '$lib/components/sidebar/sidebar-main.svelte';
	import * as Card from '$lib/components/ui/card';
	import { moviesStore } from '$lib/stores/moviesStore.js';
	import { newsStore } from '$lib/stores/newsStore.js';
	import { userStore } from '$lib/stores/userStore.js';
	import type { PageData } from './$types';
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

<main class="flex h-full w-full gap-4">
	<div class="flex h-auto flex-col gap-4">
		<SidebarMain {data} />
	</div>
	<section class="flex w-[80%] flex-col gap-4">
		<Card.Root>
			<Card.Header>
				<Card.Title>Filmes em cartaz</Card.Title>
				<Card.Description>Os filmes em cartaz durante esse mês</Card.Description>
			</Card.Header>
			<Card.Content>
				<CardMain {data} />
			</Card.Content>
		</Card.Root>
	</section>
</main>
