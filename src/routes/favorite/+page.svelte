<script lang="ts">
	import CardFavMain from '$lib/components/movies/favorite/card-fav-main.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<section class="flex w-full flex-col gap-4">
	<CardFavMain {data} />
</section>
