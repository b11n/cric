<script>
    import {matches} from '../../../data/matches'
	import Match from '../../components/match.svelte';

    
</script>

<style>
    .match-list{
        font-family: 'Noto Sans', sans-serif;
        overflow: scroll;
        height: calc(100vh - 120px);
    }

    .heading {
        font-family: 'Noto Sans', sans-serif;
        font-size: 24px;
    }

    a {
        text-decoration: none;
        margin: 12px;
        display: block;
    }
</style>

<div class="heading">Matches</div>

<div class="match-list">
    {#each matches as match, i}
        <a href="/match/{i}">
            <Match {match} index={i} condensed={true}/>
        </a>
    {/each}
</div>