<script>
	import NavLogo from './nav-logo.svelte';
	import NavUser from './nav-user.svelte';
</script>

<nav
	class="fixed left-0 right-0 top-0 z-50 mx-[10%] my-4 h-16 rounded-xl border bg-black/70 backdrop-blur-md transition-all duration-300"
>
	<div class="flex h-full items-center justify-between">
		<div>
			<NavLogo />
		</div>
		<div>
			<NavUser />
		</div>
	</div>
</nav>
