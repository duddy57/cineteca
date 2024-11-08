<script lang="ts">
	import { Label } from '../ui/label';
	import { ScrollArea } from '../ui/scroll-area';
	import SidebarNews from './sidebar-news.svelte';
	import SidebarSelect from './sidebar-select.svelte';

	export let data;

	const { news } = data;
</script>

<aside class="flex h-[80%] flex-col gap-4 rounded-lg border">
	<div class="flex flex-col gap-4 p-4">
		<SidebarSelect />
	</div>
	<ScrollArea class="h-full rounded-md border p-4 text-center">
		<Label>Ultimas noticias</Label>
		<SidebarNews {news} />
	</ScrollArea>
</aside>
