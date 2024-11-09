<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex w-full items-center justify-center gap-4 md:h-full">
	<Select.Root type="single">
		<Select.Trigger class="w-full">Selecione uma cidade</Select.Trigger>
		<Select.Content>
			<Select.Item value="">São paulo</Select.Item>
			<Select.Item value="dark">Bahia</Select.Item>
			<Select.Item value="system">Rio de janeiro</Select.Item>
		</Select.Content>
	</Select.Root>
</div>
