<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { AvatarBeam } from 'svelte-boring-avatars';
	import { Button } from '../ui/button';
	import { ShoppingCart, LogOut, Menu, HelpCircle } from 'lucide-svelte';
	import ModeToggle from '../mode-toggle.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { logout, userStore } from '$lib/stores/userStore';
	import { enhance } from '$app/forms';
	import LogoutButton from '../../../routes/logout/LogoutButton.svelte';

	function handleLogout() {
		logout();
	}

	let user = $userStore;

	function handleLogin() {
		goto('/auth');
	}
</script>

<div class="flex items-center gap-4">
	<div class="hidden items-center gap-4 sm:flex">
		{#if $userStore}
			<Button variant="outline" size="icon" class="relative">
				<ShoppingCart class="h-5 w-5" />
				<span class="sr-only">Shopping cart</span>
			</Button>
		{/if}
		<div class="hidden sm:flex">
			<ModeToggle />
		</div>
	</div>

	{#if $userStore}
		<div class="hidden sm:flex">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="focus:outline-none">
					<AvatarBeam name={$userStore.username} size={40} />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.GroupHeading>Minha conta</DropdownMenu.GroupHeading>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Minhas seções</DropdownMenu.Item>
						<DropdownMenu.Item>Club</DropdownMenu.Item>
						<DropdownMenu.Item>Conta</DropdownMenu.Item>
						<DropdownMenu.Item>
							<LogoutButton />
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
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
				<Sheet.Description class="flex flex-col items-center justify-center gap-2 p-4">
					{#if $userStore}
						<AvatarBeam name={$userStore.username} size={40} />
						<p class="text-sm font-medium">{$userStore.username}</p>
					{/if}
				</Sheet.Description>
			</Sheet.Header>
			<div class="mt-6 flex flex-col gap-4">
				<Button variant="outline" href="/">inicio</Button>
				<Button variant="outline" href="/latest">Recentes</Button>
				<Button variant="outline" href="/favorite">Favoritos</Button>
				<Button variant="outline" href="/upcoming">Em breve</Button>
				<Button variant="outline" href="/shop">Bomboniere</Button>
				{#if $userStore}
					<Button variant="outline" size="lg">Minhas seções</Button>
					<Button variant="outline" size="lg">Club</Button>
					<Button variant="outline" size="lg">Conta</Button>
					<LogoutButton />
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

				<div class="flex items-center justify-between gap-2 p-1">
					<ModeToggle />
					<Button variant="outline" size="icon" class="relative">
						<ShoppingCart class="h-5 w-5" />
					</Button>
					<Button variant="outline" size="icon" class="relative">
						<HelpCircle class="h-5 w-5" />
					</Button>
				</div>
			</div>
		</Sheet.Content>
	</Sheet.Root>
</div>
