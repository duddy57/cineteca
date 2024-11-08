<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '../ui/button';

	export let news;
</script>

<div class="flex flex-col gap-4">
	{#each news as article}
		<Card.Root class="border-none">
			<Card.Header>
				<img src={article.image_url} alt={article.title} />
				<Card.Title class="overflow-hidden  text-sm font-bold">
					{article.title}
				</Card.Title>
				<Card.Description>{article.description}</Card.Description>
			</Card.Header>
			<Card.Content class="flex w-full items-center justify-center ">
				<Button variant="secondary" href={article.url} target="_blank">Leia mais</Button>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
