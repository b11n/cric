<script lang="ts">
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
</script>

<div class="match" class:condensed={condensed === true}>
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

<style>
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

	.match.condensed img {
		width: 50px;
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
		max-width: 100px;
	}
</style>
