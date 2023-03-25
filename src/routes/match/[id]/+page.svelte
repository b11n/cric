<script lang="ts">
	import { page } from '$app/stores';
	import { matches } from '../../../../data/matches';
    import { players } from '../../../../data/players';

	const match = matches[parseInt($page.params.id)];
    const selectedPlayers = players.filter((player)=>{
        return player.team === match.homeCode || player.team === match.awayCode;
    })
</script>

<div class="match">
	<div class="date">{match.date} {match.time}</div>
	<div class="teams">
		<div class="home">
			<img src="https://scores.iplt20.com/ipl/teamlogos/{match.homeCode}.png?v=2" alt="" />
			<div class="teamname">{match.home}</div>
		</div>
		vs
		<div class="away">
			<img src="https://scores.iplt20.com/ipl/teamlogos/{match.awayCode}.png?v=2" alt="" />
			<div class="teamname">{match.away}</div>
		</div>
	</div>
</div>
<br><br>
<div class="match">
    YOUR BETS

    <br><br>

    <div>Winner</div>
    <select name="" id="">
        <option value="NONE">No Selection</option>
        <option value="{match.awayCode}">{match.away}</option>
        <option value="{match.homeCode}">{match.home}</option>
    </select>
    <div>Man of the Match</div>

    <select name="" id="">
        <option value="NONE">No Selection</option>
        {#each selectedPlayers as player}
            <option value="{player.name}">{player.name}</option>
        {/each}
    </select>

    <br><br>

    <button>Save selection</button>

</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&family=Sofia+Sans+Extra+Condensed&display=swap');

	.match {
		font-family: 'Sofia Sans Extra Condensed', sans-serif;
		border: 2px solid #888888;
		border-radius: 8px;
		padding: 12px;
        font-size: 20px;
	}

    .date {
        font-size: 20px;
        margin-left: 10px;
    }

	.teams {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	img {
		width: 120px;
	}

	.home,
	.away {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.teamname {
		font-size: 24px;
        text-transform: uppercase;
    font-style: italic;
    text-align: center;
	}
</style>
