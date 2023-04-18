<script lang="ts">
	import { onMount } from 'svelte';
	import { matches } from '../../../data/matches';
	import Match from '../../components/match.svelte';
	import Chip, { Set, Text } from '@smui/chips';

	let choices = ['Upcoming', 'Past','All'];
	let selected = 'Upcoming';

	const matchWithIndex = matches.map((match, index)=>{return {...match, index};})
	let selectedMatches = [];

	onMount(()=>{
		filter();
	});
	

	function filter() {
		setTimeout(function () {
			const currentTime = new Date().getTime();
			selectedMatches = matchWithIndex.filter((match) => {
				const matchTime =  new Date(match.date + ' ' + match.time).getTime();
				if (selected === null || selected === 'All') {
					return true;
				} else if (selected === 'Past') {
					return  matchTime <= currentTime;
				} else {
					return matchTime > currentTime;
				}
			});
			if(selected === 'Past') {
				selectedMatches = selectedMatches.reverse();
			}
		}, 10);
	}
</script>

<div class="heading-holder">
	<div class="heading">Matches</div>
</div>

<Set chips={choices} let:chip choice bind:selected>
	<Chip {chip} on:click={filter}>
		<Text>{chip}</Text>
	</Chip>
</Set>

<div class="match-list">
	{#each selectedMatches as match, i}
		<a href="/match/{match.index}">
			<Match {match} condensed={true} />
		</a>
	{/each}
</div>

<style>
	.match-list {
		font-family: 'Noto Sans', sans-serif;
		overflow: scroll;
		height: calc(100vh - 120px);
	}

	.heading-holder {
		display: flex;
		justify-content: space-between;
	}

	.heading {
		font-family: 'Noto Sans', sans-serif;
		font-size: 24px;
		margin-left: 16px;
		margin-top: 12px;
	}

	a {
		text-decoration: none;
		margin: 12px;
		display: block;
	}

	a:link {
		color: black;
	}
	a:visited {
		color: black;
	}
</style>
