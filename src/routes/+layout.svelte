<script lang="ts">
	import NavMain from '$lib/components/navbar/nav-main.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	let { children } = $props();
</script>

<Toaster />
<ModeWatcher />

<main class="h-screen w-full">
	<div class="flex h-full w-full flex-col">
		<NavMain />
		<div class="mt-28 flex h-full w-full flex-col">
			{@render children()}
		</div>
	</div>
</main>
