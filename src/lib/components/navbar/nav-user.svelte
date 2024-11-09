<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { AvatarBeam } from 'svelte-boring-avatars';
	import { Button } from '../ui/button';
	import { ShoppingCart, LogOut, Menu } from 'lucide-svelte';
	import ModeToggle from '../mode-toggle.svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/userStore';
	import { enhance } from '$app/forms';

	let user: any;
	const unsubscribe = userStore.subscribe((value) => {
		user = value;
	});

	$: hasUser = user && user.username ? true : false;

	function handleLogout() {
		// Implement logout logic here
	}

	function handleLogin() {
		goto('/auth');
	}
</script>

<div class="flex items-center gap-4">
	<div class="hidden items-center gap-4 sm:flex">
		{#if hasUser}
			<Button variant="outline" size="icon" class="relative">
				<ShoppingCart class="h-5 w-5" />
				<span class="sr-only">Shopping cart</span>
			</Button>
		{/if}
		<div class="hidden sm:flex">
			<ModeToggle />
		</div>
	</div>

	{#if hasUser}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="focus:outline-none">
				<AvatarBeam name={user.name} size={40} />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.GroupHeading>Minha conta</DropdownMenu.GroupHeading>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Minhas seções</DropdownMenu.Item>
					<DropdownMenu.Item>Club</DropdownMenu.Item>
					<DropdownMenu.Item>Conta</DropdownMenu.Item>
					<DropdownMenu.Item>
						<form method="post" class="w-full" action="?/logout" use:enhance>
							<Button variant="outline" size="sm" class="flex w-full items-center gap-2">
								<LogOut class="h-4 w-4" />
								Sair
							</Button>
						</form>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{:else}
		<Button variant="outline" size="sm" onclick={handleLogin} class="hidden sm:inline-flex">
			Entrar
		</Button>
	{/if}

	<Sheet.Root>
		<Sheet.Trigger class="mr-4 sm:hidden">
			<Button variant="ghost" size="icon" class="relative">
				<Menu class="h-5 w-5" />
				<span class="sr-only">Menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="right" class="w-[300px] sm:w-[400px]">
			<Sheet.Header>
				<Sheet.Title>Menu</Sheet.Title>
				<Sheet.Description>Acesse as opções do seu perfil</Sheet.Description>
			</Sheet.Header>
			<div class="mt-6 flex flex-col gap-4">
				<Button variant="outline" href="/">inicio</Button>
				<Button variant="outline" href="/latest">Recentes</Button>
				<Button variant="outline" href="/favorite">Favoritos</Button>
				<Button variant="outline">Bomboniere</Button>
				{#if hasUser}
					<Button variant="outline" size="lg" class="justify-start">
						<ShoppingCart class="mr-2 h-5 w-5" />
						Carrinho
					</Button>
					<Button variant="outline" size="lg" class="justify-start">Minhas seções</Button>
					<Button variant="outline" size="lg" class="justify-start">Club</Button>
					<Button variant="outline" size="lg" class="justify-start">Conta</Button>
					<form method="post" action="?/logout" use:enhance>
						<Button variant="outline" size="lg" class="w-full justify-start">
							<LogOut class="mr-2 h-5 w-5" />
							Sair
						</Button>
					</form>
				{:else}
					<Button
						variant="outline"
						size="lg"
						onclick={handleLogin}
						class="items-center justify-center"
					>
						Entrar
					</Button>
				{/if}

				<div class="flex items-center gap-2 rounded-lg border p-1">
					<ModeToggle />
					<p>Mudar tema</p>
				</div>
			</div>
		</Sheet.Content>
	</Sheet.Root>
</div>
