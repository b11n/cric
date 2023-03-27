<script lang="ts">
	import Radio from '@smui/radio';
	import FormField from '@smui/form-field';
	import Autocomplete from '@smui-extra/autocomplete';
	import Button, { Label } from '@smui/button';
	import LinearProgress from '@smui/linear-progress';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	import { matches } from '../../../../data/matches';
	import { players } from '../../../../data/players';
	import Match from '../../../components/match.svelte';
	import { initDatabase } from '../../../client/db';
	import { auth as authStore } from '../../../store/auth';
    import dayjs from 'dayjs'

	const matchId = parseInt($page.params.id);
	const match = matches[matchId];
	const selectedPlayers = players
		.filter((player) => {
			return player.team === match.homeCode || player.team === match.awayCode;
		})
		.map((player) => player.name);

	let saveSelection = () => {};

	let selectedTeam = 'none';
	let momSelected = '';
	let lastUpdated: number | null = null;
    let isLoading = false;
    let interval = -1;
    let disabled = false;
    let warning = '';

    function getDiff(time1:number, time2:number) {
        const date1 = dayjs(time1);
        const date2 = dayjs(time2);
        return date2.diff(date1, 'second');
    }

	onMount(() => {
		const { addPrediction, getLatestPrediction } = initDatabase();
		saveSelection = () => {
            isLoading = true;
			authStore.subscribe(async (user) => {
				await addPrediction(user?.uid || '', selectedTeam, momSelected || '', matchId);
				lastUpdated = new Date().getTime();
                isLoading = false;
			});
		};

        isLoading = true;
		authStore.subscribe(async (user) => {
			const prediction = await getLatestPrediction(user?.uid || '', matchId);
            isLoading = false;
			selectedTeam = prediction.team;
			momSelected = prediction.manOfMatch;
			if (prediction.timestamp) {
				console.log(prediction);
				lastUpdated = prediction.timestamp.seconds * 1000;
			}
		});


        let diff = getDiff(new Date().getTime(), new Date(`${match.date} ${match.time}`).getTime())
        if(diff > 0) {
            interval = window.setInterval(()=>{
                diff = getDiff(new Date().getTime(), new Date(`${match.date} ${match.time}`).getTime())
                if(diff < 0) {
                    clearInterval(interval);
                    disabled = true;
                }else {
                    if(diff > 60) {
                        warning = `Closes in ${Math.trunc(diff/60)} minutes`;
                    }else{
                        warning = `Closes in ${diff} seconds`;
                    }
                }
            },1000);
        }else {
            disabled = true;
        }


	});

    onDestroy(()=>{
        clearInterval(interval);
    })
</script>

<div class="wrap">
	<Match {match} condensed={true} selected={selectedTeam} />

	<br /><br />
	<div class="match">
        <div class="loading-container">
            {#if isLoading} 
                <LinearProgress indeterminate />
            {/if}
        </div>

		<div class="matchcontent">
            <div class="heading">
                <div class="title">YOUR BETS</div>
                <div class="last-updated"></div>
            </div>
            {warning}

			<br /><br />

			<div>Winner</div>

			<FormField>
				<Radio bind:group={selectedTeam} value={'none'}   {disabled}/>
				<span slot="label"> No Selection </span>
			</FormField>
			<br />

			<FormField>
				<Radio bind:group={selectedTeam} value={match.homeCode}   {disabled} />
				<span slot="label">
					{match.home}
				</span>
			</FormField>
			<br />

			<FormField>
				<Radio bind:group={selectedTeam} value={match.awayCode}  {disabled} />
				<span slot="label">
					{match.away}
				</span>
			</FormField>

			<br /><br />
			<div>Man of the Match</div>
			<br />
			<div class="autocomplete">
				<Autocomplete  {disabled}
					options={selectedPlayers}
					textfield$variant="outlined"
					bind:value={momSelected}
					label="Man of the match"
				/>
				<br />
			</div>

			<br />

			<div class="bottom">
				<div class="lastupdaed-wrapper">
					{#if lastUpdated}
						<div class="lastupdated">Updated<br /> {new Date(lastUpdated).toLocaleString()}</div>
					{/if}
				</div>

				<Button variant="raised" on:click={saveSelection} {disabled}>
					<Label>Save selection</Label>
				</Button>
			</div>
		</div>
	</div>
</div>

<style>
	.match {
		font-family: 'Sofia Sans Extra Condensed', sans-serif;
		border: 2px solid #888888;
		border-radius: 8px;
		
		font-size: 20px;
	}

    .loading-container {
        height: 2px;
    }

    .matchcontent {
        padding: 12px;
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
		color: rgba(0, 0, 0, 0.87);
		margin-top: 8px;
	}

	.lastupdated {
		font-size: 12px;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
	}
</style>
