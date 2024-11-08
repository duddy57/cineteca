<script lang="ts">
	import NavMain from '$lib/components/navbar/nav-main.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import type { PageData } from './$types';
	import { Toaster } from '$lib/components/ui/sonner';
	let { children, data } = $props();
</script>

<Toaster />
<ModeWatcher />
<NavMain />
<main class="container mx-auto my-28 h-screen px-4">
	{@render children()}
</main>
