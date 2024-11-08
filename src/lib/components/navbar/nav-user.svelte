<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { AvatarBeam } from 'svelte-boring-avatars';
	import { Button } from '../ui/button';
	import { ShoppingCart } from 'lucide-svelte';
	import ModeToggle from '../mode-toggle.svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/userStore';

	const user = userStore.subscribe((value) => {
		console.log('valor da store: ', value);
	});
</script>

<div class="flex items-center gap-4">
	<div class="flex items-center gap-4">
		{#if user}
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
