<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { AvatarBeam } from 'svelte-boring-avatars';
	import { Button } from '../ui/button';
	import { ShoppingCart, LogOut } from 'lucide-svelte';
	import ModeToggle from '../mode-toggle.svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/userStore';
	import { enhance } from '$app/forms';

	let user: any;
	const unsubscribe = userStore.subscribe((value) => {
		user = value;
	});

	$: hasUser = user && user.username ? true : false;

	console.log(hasUser);
</script>

<div class="flex items-center gap-4">
	<div class="flex items-center gap-4">
		{#if hasUser}
			<Button variant="outline" size="lg">
				<ShoppingCart />
			</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<AvatarBeam name={user.name} />
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
									<LogOut />
									Sair
								</Button>
							</form>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<Button
				variant="outline"
				size="lg"
				onclick={() => {
					goto('/auth');
				}}>Entrar</Button
			>
		{/if}
	</div>
	<div class="mx-4 flex items-center">
		<ModeToggle />
	</div>
</div>
