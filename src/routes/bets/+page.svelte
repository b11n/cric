<script lang="ts">
	import Bets from "../../components/bets.svelte";
</script>

<div class="wrap">
    <div class="heading">
        All bets
    </div>
    
    <Bets />
</div>


<style>
    .heading {
		font-family: 'Noto Sans', sans-serif;
		font-size: 24px;
        margin-left: 12px;
	}

    .wrap {
        margin: 8px;
        margin-bottom: 64px
    }
</style>