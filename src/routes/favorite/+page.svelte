<script lang="ts">
	import CardFavMain from '$lib/components/movies/favorite/card-fav-main.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let { popular } = data;
</script>

<section class="flex w-full flex-col gap-4">
	<CardFavMain {popular} />
</section>
