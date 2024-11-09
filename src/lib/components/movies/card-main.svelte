<script lang="ts">
	import CardCarousel from './card-carousel.svelte';

	export let data;

	const { movies } = data;
</script>

<div class="items-center gap-4">
	<CardCarousel {movies} />
</div>
