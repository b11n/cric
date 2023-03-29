<script lang="ts">
	import { auth } from '../store/auth';
	import { matches } from '../../data/matches';
	import Match from '../components/match.svelte';
	import { onMount } from 'svelte';
	import { initDatabase } from '../client/db';
	import { auth as authStore } from '../store/auth';
	import Bets from '../components/bets.svelte';
	import Button, { Label } from '@smui/button';
	import type { Match as MatchType } from '../types';

	let subset: MatchType[] = [];
	let subsetIndeces: number[] = [];
	let bets = [];

	function getMatchAfterCurrentDate() {
		for (let i = 0; i < matches.length; i++) {
			if (new Date(matches[i].date + ' ' + matches[i].time).getTime() >= new Date().getTime()) {
				subset.push(matches[i]);
				subsetIndeces.push(i);
			}

			if (subset.length === 3) {
				break;
			}
		}
	}

	getMatchAfterCurrentDate();
	onMount(() => {
		const { getUserBets } = initDatabase();
		authStore.subscribe(async (user) => {
			bets = await getUserBets(user?.uid || '');
		});
	});
</script>

<div class="home-section">
	<div class="heading">
		{#if $auth}
			Welcome {$auth.userName}
		{/if}
	</div>
	<div class="section-content" />
</div>

<div class="home-section">
	<div class="heading">Upcoming Matches</div>

	<div class="section-content">
		<div class="match-list">
			{#each subset as match, i}
				<a href="/match/{subsetIndeces[i]}">
					<Match {match} displayMode="list" />
				</a>
			{/each}
		</div>
	</div>
</div>

<div class="home-section">
	<div class="heading">Your Bets</div>
	<div class="section-content">
		<Bets mini={true} />
        <div class="button-wrap">
            <Button href="/bets">
                <Label>More</Label>
            </Button>
        </div>
	</div>
</div>

<style>
	.heading {
		font-family: Noto Sans, sans-serif;
		font-size: 24px;
		margin-left: 14px;
		text-transform: uppercase;
		font-size: 16px;
		font-weight: bold;
		color: #4b4b4b;
	}

    .button-wrap {
        display: flex;
        justify-content: end;
        margin-right: 8px;
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

	.home-section {
		margin: 20px;
	}
</style>
