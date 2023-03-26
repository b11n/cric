<script lang="ts">
	import { page } from '$app/stores';
	import { matches } from '../../../../data/matches';
	import { players } from '../../../../data/players';
	import Match from '../../../components/match.svelte';
    import Radio from '@smui/radio';
    import FormField from '@smui/form-field';
    import Autocomplete from '@smui-extra/autocomplete';
    import Button, { Label } from '@smui/button';
    import {initDatabase} from '../../../client/db'
    import { onMount } from 'svelte';
    import { auth as authStore} from '../../../store/auth';

    const matchId = parseInt($page.params.id);
	const match = matches[matchId];
	const selectedPlayers = players.filter((player) => {
		return player.team === match.homeCode || player.team === match.awayCode;
	}).map(player=>player.name);


    let saveSelection = ()=>{};




    let selectedTeam = 'none';
    let momSelected = '';
    let lastUpdated:number|null = null;

    onMount(()=>{
        const {addPrediction,getLatestPrediction } = initDatabase();
        saveSelection =  () => {
            authStore.subscribe((user)=>{
                addPrediction(user?.uid || '', selectedTeam, momSelected || '',matchId );
                lastUpdated = new Date().getTime();
            });
            
        }

        authStore.subscribe(async (user)=>{
            const prediction = await getLatestPrediction(user?.uid || '', matchId);
            selectedTeam = prediction.team;
            momSelected = prediction.manOfMatch;
            if(prediction.timestamp) {
                console.log(prediction)
                lastUpdated = prediction.timestamp.seconds*1000;
            }
        });

       
    })
</script>

<div class="wrap">
	<Match {match} condensed={true}/>

	<br /><br />
	<div class="match">
		YOUR BETS

		<br /><br />

		<div>Winner</div>

        <FormField>
            <Radio
              bind:group={selectedTeam}
              value={'none'}
            />
            <span slot="label">
              No Selection
            </span>
        </FormField>
        <br>

        <FormField>
            <Radio
              bind:group={selectedTeam}
              value={match.homeCode}
            />
            <span slot="label">
              {match.home}
            </span>
        </FormField>
        <br>

        <FormField>
            <Radio
              bind:group={selectedTeam}
              value={match.awayCode}
            />
            <span slot="label">
              {match.away}
            </span>
        </FormField>

        <br /><br />
		<div>Man of the Match</div>
        <br />
        <div class="autocomplete">
            <Autocomplete
              options={selectedPlayers}
              textfield$variant="outlined"
              bind:value={momSelected}
              label="Man of the match"
            />
            <br />
            <div class="selected">
                Selected: {momSelected || 'No Selection'}
            </div>
        </div>

		<br />

        <div class="bottom">
            <div class="lastupdaed-wrapper">
                {#if lastUpdated}
                    <div class="lastupdated">Updated: {new Date(lastUpdated).toLocaleString()}</div>
                {/if}
            </div>

            <Button variant="raised"  on:click={saveSelection} >
                <Label>Save selection</Label>
            </Button>

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

    .wrap {
        padding: 16px;
        margin-bottom: 50px;
    }

    .autocomplete {
        width: 100%;
    }

    .lastupdated,
    .selected {
        font-family: Roboto;
        font-size: 14px;
        color: rgba(0,0,0,.87);
        margin-top: 8px;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
    }
</style>
