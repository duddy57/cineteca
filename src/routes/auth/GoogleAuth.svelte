<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
</script>

<Button
	onclick={() => {
		goto('/auth/google');
	}}
>
	Entre com o Google
</Button>
