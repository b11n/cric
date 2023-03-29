<script lang="ts">
	import Appsection from '../../components/appsection.svelte';
	import Bets from '../../components/bets.svelte';
</script>

<Appsection>
	<div slot="header">All bets</div>
	<div slot="body">
		<Bets />
	</div>
</Appsection>
