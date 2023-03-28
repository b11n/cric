<script lang="ts">
    import Timer from './timer.svelte'
	interface Match {
		date: string;
		home: string;
		away: string;
		venue: string;
		time: string;
		awayCode: string;
		homeCode: string;
	}
	export let match: Match;
	export let condensed = false;
	export let selected = '';
    export let displayMode = 'large';
    export let bet = {manOfMatch: 'none', team:'none'};
</script>

{#if displayMode === 'list'}
    <div class="list-mode">
        
        <div class="teams">
            <div class="home-container" class:selected={bet.team === match.homeCode}>
                <img src="https://scores.iplt20.com/ipl/teamlogos/{match.homeCode}.png?v=2" alt="" />
                {match.homeCode}
            </div>
            <div>vs</div>
            <div class="away-container" class:selected={bet.team === match.awayCode}>
                <img src="https://scores.iplt20.com/ipl/teamlogos/{match.awayCode}.png?v=2" alt="" />
                {match.awayCode}
            </div>
    
        </div>
        {#if bet.manOfMatch !== 'none'}
            <div class="man-of-match-bet">{bet.manOfMatch}</div>
        {/if}
        <div></div>
        <div class="date"><div>{match.date} {match.time}  </div>  <Timer ts={new Date(match.date + " " +match.time)}></Timer></div> 

    </div>
{:else}
    <div class="match" class:condensed={condensed === true}>
        <div class="date"><div>{match.date} {match.time}  </div>  <Timer ts={new Date(match.date + " " +match.time)}></Timer></div> 
        <div class="teams">
            <div class="home" class:selected={selected === match.homeCode}>
                <img src="https://scores.iplt20.com/ipl/teamlogos/{match.homeCode}.png?v=2" alt="" />
                <div class="team-name">{match.home}</div>
            </div>
            vs
            <div class="away" class:selected={selected === match.awayCode}>
                <img src="https://scores.iplt20.com/ipl/teamlogos/{match.awayCode}.png?v=2" alt="" />
                <div class="team-name">{match.away}</div>
            </div>
        </div>
    </div>
{/if}

<style>
	.match {
		font-family: 'Sofia Sans Extra Condensed', sans-serif;
		border-radius: 8px;
		padding: 12px;
		font-size: 20px;
        background: white;
	}

	.date {
		font-size: 20px;
        display: flex;
        width: 100%;
        justify-content: space-between;
	}

	.teams {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	img {
		width: 120px;
	}

    .list-mode{ 
        display: flex;
        padding: 8px;
        font-size: 18px;
        border-radius: 6px;
        background: white;
        justify-content: space-between;
        font-family: sans-serif;
        align-items: center;
    }

    .list-mode .home-container,
    .list-mode .away-container {
        font-family: 'Sofia Sans Extra Condensed', sans-serif;
        font-size: 24px;
        display: flex;
        align-items: center;
        width: 96px;;
        font-weight: bold;
        color: #202020;
    }

    .list-mode .away-container {
        margin-left: 8px;;
    }

    .list-mode .home-container{
        margin-right: 8px;
    }

    .list-mode .teams {
        width: 200px;
    }

    .list-mode .man-of-match-bet,
    .list-mode .date {
        font-size: 12px;
        width: unset;
    }

    .list-mode img{
        width: 36px;
        height: 36px;
        margin-right: 8px;
    }

    .list-mode .selected {
        border-radius: 4px;
        padding: 4px;
    }

	.match.condensed img {
		width: 50px;
        height: 50px;
	}

	.selected {
        transition: all .5s ease;
		background: #d5d1ff;
	}

	.home,
	.away {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 8px;
		border-radius: 8px;
        width: 132px;
	}

	.team-name {
		font-size: 18px;
		text-transform: uppercase;
		text-align: center;
        max-width: 128px;
        height: 20px;
	}
</style>
