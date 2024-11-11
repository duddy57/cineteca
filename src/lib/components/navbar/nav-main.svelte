<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';
	import { Button } from '../ui/button';
	import NavLogo from './nav-logo.svelte';
	import NavUser from './nav-user.svelte';
	import { Home, Film, Candy } from 'lucide-svelte';
</script>

<nav
	class="fixed left-0 right-0 top-0 z-50 mx-[10%] my-4 h-16 rounded-xl border bg-black/40 backdrop-blur-md transition-all duration-300"
>
	<div class="flex h-full items-center justify-between md:mr-6">
		<div>
			<NavLogo />
		</div>
		<div class="flex items-center gap-10">
			<div class="hidden gap-4 md:flex">
				<Button
					variant="ghost"
					onclick={() => {
						goto('/');
					}}
				>
					<Home />
					Inicio
				</Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="ghost">
							<Film />
							Filmes
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item
								onclick={() => {
									goto('favorite');
								}}>Favoritos</DropdownMenu.Item
							>
							<DropdownMenu.Item>Pre-vendas</DropdownMenu.Item>
							<DropdownMenu.Item>Lançamentos</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<Button
					variant="ghost"
					onclick={() => {
						goto('/shop');
					}}
				>
					<Candy />
					Bomboniere
				</Button>
			</div>
			<div>
				<NavUser />
			</div>
		</div>
	</div>
</nav>
