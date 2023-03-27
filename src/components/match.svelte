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
	export let selected = '';
</script>

<div class="match" class:condensed={condensed === true}>
	<div class="date">{match.date} {match.time}</div>
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
	}

	.team-name {
		font-size: 24px;
		text-transform: uppercase;
		font-style: italic;
		text-align: center;
		max-width: 100px;
	}
</style>
