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

	const match = matches[parseInt($page.params.id)];
	const selectedPlayers = players.filter((player) => {
		return player.team === match.homeCode || player.team === match.awayCode;
	}).map(player=>player.name);


    let saveSelection = ()=>{};




    let selectedTeam = 'none';
    let momSelected = ''

    onMount(()=>{
        const {addPrediction,getLatestPrediction } = initDatabase();
        saveSelection =  () => {
            authStore.subscribe((user)=>{
                addPrediction(user?.uid || '', selectedTeam, momSelected || '');
            });
            
        }

        authStore.subscribe(async (user)=>{
            const prediction = await getLatestPrediction(user?.uid || '');
            selectedTeam = prediction.team;
            momSelected = prediction.manOfMatch;
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
            Selected: {momSelected || 'No Selection'}
        </div>

		<br />

        <Button variant="raised"  on:click={saveSelection} >
            <Label>Save selection</Label>
        </Button>
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
    }

    .autocomplete {
        width: 100%;
    }
</style>
