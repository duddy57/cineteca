<script lang="ts">
	import NavMain from '$lib/components/navbar/nav-main.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	let { children } = $props();
</script>

<Toaster />
<ModeWatcher />
<main class="mx-auto mt-28 h-screen px-4">
	<NavMain />
	{@render children()}
</main>
