<script lang="ts">
	import { page } from '$app/stores';
	import Button, { Label } from '@smui/button';
	import FormField from '@smui/form-field';
	import LinearProgress from '@smui/linear-progress';
	import Radio from '@smui/radio';
	import dayjs from 'dayjs';
	import { onDestroy, onMount } from 'svelte';
	import { matches } from '../../../../data/matches';
	import { players } from '../../../../data/players';
	import { initDatabase } from '../../../client/db';
	import Match from '../../../components/match.svelte';
	import Select from '../../../components/select.svelte';
	import { auth as authStore } from '../../../store/auth';

	import IconButton from '@smui/icon-button';
	import Snackbar, { Actions, Label as SnackbarLabel } from '@smui/snackbar';

	let snackbarWithClose: Snackbar;

	const matchId = parseInt($page.params.id);
	const match = matches[matchId];
	const selectedPlayers = players
		.filter((player) => {
			return player.team === match.homeCode || player.team === match.awayCode;
		})
		.map((player) => player.name);
	selectedPlayers.push('No Selection');

	let saveSelection = () => {};

	let selectedTeam = 'none';
	let momSelected = '';
	let lastUpdated: number | null = null;
	let isLoading = false;
	let interval = -1;
	let disabled = false;
	let warning = '';

	function getDiff(time1: number, time2: number) {
		const date1 = dayjs(time1);
		const date2 = dayjs(time2);
		return date2.diff(date1, 'second');
	}

	onMount(() => {
		const { addPrediction, getLatestPrediction } = initDatabase();
		saveSelection = () => {
			isLoading = true;
			const manOfMatch = momSelected === 'No Selection' ? 'none' : momSelected;
			authStore.subscribe(async (user) => {
				await addPrediction(user?.uid || '', selectedTeam, manOfMatch || '', matchId);
				lastUpdated = new Date().getTime();
				isLoading = false;
				snackbarWithClose.forceOpen();
			});
		};

		isLoading = true;
		authStore.subscribe(async (user) => {
			const prediction = await getLatestPrediction(user?.uid || '', matchId);
			isLoading = false;
			selectedTeam = prediction.team;
			momSelected = prediction.manOfMatch === 'none' ? 'No Selection' : prediction.manOfMatch;
			if (prediction.timestamp) {
				lastUpdated = prediction.timestamp.seconds * 1000;
			}
		});

		let diff = getDiff(new Date().getTime(), new Date(`${match.date} ${match.time} +5:30`).getTime());
		if (diff > 0) {
			interval = window.setInterval(() => {
				diff = getDiff(new Date().getTime(), new Date(`${match.date} ${match.time} +5:30`).getTime());
				if (diff < 0) {
					clearInterval(interval);
					warning = `Closed for predictions`;
					disabled = true;
				} else {
					if (diff > 60 * 60 * 24) {
						warning = `Closes in ${Math.trunc(diff / (60 * 60 * 24))} days`;
					} else if (diff > 60) {
						warning = `Closes in ${Math.trunc(diff / 60)} minutes`;
					} else {
						warning = `Closes in ${diff} seconds`;
					}
				}
			}, 1000);
		} else {
			warning = `Closed for predictions`;
			disabled = true;
		}
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<Snackbar bind:this={snackbarWithClose} timeoutMs={4000}>
	<SnackbarLabel>Prediction saved.</SnackbarLabel>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>

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
                <div class="lastupdaed-wrapper">
					{#if lastUpdated}
						<div class="lastupdated">Updated<br /> {new Date(lastUpdated).toLocaleString()}</div>
					{/if}
				</div>
			</div>
            <div class="warning">
                {warning}
            </div>
			

			<br /><br />

			<div>Winner</div>

			<FormField>
				<Radio bind:group={selectedTeam} value={'none'} {disabled} />
				<span slot="label"> None </span>
			</FormField>

			<FormField>
				<Radio bind:group={selectedTeam} value={match.homeCode} {disabled} />
				<span slot="label">
					{match.homeCode}
				</span>
			</FormField>

			<FormField>
				<Radio bind:group={selectedTeam} value={match.awayCode} {disabled} />
				<span slot="label">
					{match.awayCode}
				</span>
			</FormField>

			<br /><br />
			<div class="form-label">Man of the Match</div>

			<div class="autocomplete">
				<Select options={selectedPlayers} bind:value={momSelected} {disabled} />
				<br />
			</div>

			<br />

			<div class="bottom">

				<Button variant="raised" on:click={saveSelection} {disabled} style="width: 100%">
					<Label>Save selection</Label>
				</Button>
			</div>
		</div>
	</div>
</div>

<style>
	.match {
		font-family: 'Sofia Sans Extra Condensed', sans-serif;
		border-radius: 8px;
		background-color: white;
		font-size: 20px;
	}

    .heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
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

	.lastupdated {
		font-family: Roboto;
		font-size: 14px;
		color: rgba(135, 135, 135, 0.87);
		margin-top: 8px;
	}

	.lastupdated {
		font-size: 12px;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
	}

    .form-label {
        margin-bottom: 12px;
    }

    .warning {
        font-family: Roboto;
        font-size: 14px;
		color: rgba(112, 112, 112, 0.87);
        font-weight: bold;
        text-transform: uppercase;
        height: 14px;
    }
</style>
