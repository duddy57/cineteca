<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { set } from 'zod';

	function timeRefresh() {
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	}
</script>

<form method="post" action="?/logout" use:enhance>
	<Button type="submit" onclick={timeRefresh}>Sair</Button>
</form>
