<script lang="ts">
	import CardCarousel from './card-carousel.svelte';

	export let data;

	const { movies } = data;
</script>

<div class="flex h-full w-full flex-col gap-4">
	<CardCarousel {movies} />
</div>
