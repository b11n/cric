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
	import Appsection from '../components/appsection.svelte';

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


<Appsection>
	<div slot="header">
		{#if $auth}
			Welcome {$auth.userName}
		{/if}
	</div>
</Appsection>

<Appsection>
	<div slot="header">
		Upcoming Matches
	</div>
    <div slot="body">
        <div class="match-list">
			{#each subset as match, i}
				<a href="/match/{subsetIndeces[i]}">
					<Match {match} displayMode="list" />
				</a>
			{/each}
		</div>
    </div>
</Appsection>


<Appsection>
	<div slot="header">
		Your Bets
	</div>
    <div slot="body">
        <Bets mini={true} />
        <div class="button-wrap">
            <Button href="/bets">
                <Label>More</Label>
            </Button>
        </div>
    </div>
</Appsection>

<style>

    .button-wrap {
        display: flex;
        justify-content: end;
        margin-right: 8px;
    }

	a {
		text-decoration: none;
		margin: 12px 0;
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
