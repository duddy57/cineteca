<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { latest } = data;
</script>

<div class="container mx-auto px-4 py-8">
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each latest as item (item.id)}
			<div class="flex flex-col items-center">
				<div class="relative w-full overflow-hidden rounded-lg pb-[150%] shadow-md">
					<img
						src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
						alt={`Poster for ${item.title}`}
						loading="lazy"
						class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
					/>
				</div>
				<h3 class="mt-2 text-center text-sm font-medium">{item.title}</h3>
			</div>
		{/each}
	</div>
</div>
