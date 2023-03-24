<script>
    import {matches} from '../../../data/matches'

    
</script>

<style>
    .match-list{
        font-family: 'Noto Sans', sans-serif;
    }

    .heading {
        font-family: 'Noto Sans', sans-serif;
        font-size: 24px;
    }
</style>

<div class="heading">Matches</div>

<div class="match-list">
    {#each matches as match, i}
        <a href="/match/{i}">
            {i+1}
            <div>{match.date}</div>
            <div>{match.home} vs {match.away}</div>
        </a>
        <p></p>
    {/each}
</div>