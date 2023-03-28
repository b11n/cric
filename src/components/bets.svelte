<script lang="ts">
	import { matches } from '../../data/matches';
	import Match from '../components/match.svelte';
    import {onMount} from 'svelte'
	import { initDatabase } from '../client/db';
	import { auth as authStore } from '../store/auth';

    export let mini = false;

    let bets = [];

    onMount(()=>{
        const { getUserBets } = initDatabase(); 
        authStore.subscribe(async (user) => {
            bets = await getUserBets(user?.uid || '');
        })
        
    });
</script>

<div class="match-list">
    {#each bets as bet, i}
        {#if i < (mini ? 3 : bets.length)}
            <a href="/match/{bet.matchId}">
                <Match match={matches[bet.matchId]}  bet={bet} displayMode="list" />
            </a>
        {/if}
    {/each}
</div>

<style>

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