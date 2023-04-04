<script lang="ts">
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import List, { Item, Text } from '@smui/list';
	import Menu from '@smui/menu';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import { onMount } from 'svelte';
	import { initDatabase } from '../client/db';
	import { initFirebase } from '../client/firebase';
	import Analytics from '../components/analytics.svelte';
	import { auth as authStore } from '../store/auth';

	let menu: Menu;
	let hasUser = false;

	let login = () => {};
	let signout = () => {};

	onMount(() => {
		const { auth, onAuthStateChanged, signIn, signOutFromApp } = initFirebase();
		const { checkAndAddUser } = initDatabase();
		login = signIn();
		signout = signOutFromApp();

		onAuthStateChanged(auth, (data: any) => {
			if (data && data.email && data.uid) {
				checkAndAddUser(data.uid, data.displayName, data.email);

				authStore.set({
					userName: data.displayName,
					uid: data.uid,
					email: data.email,
					photo: data.photoURL
				});
				hasUser = true;
			} else {
				authStore.set(null);
				hasUser = false;
			}
		});
	});
</script>

<Analytics />

{#if !hasUser}
	<div class="large-bg">
		<Button on:click={login} variant="raised">
			<Label>Login with Google</Label>
		</Button>
	</div>
{:else}
	<div class="top-app-bar-container">
		<TopAppBar
			variant="static"
			color={'primary'}
		>
			<Row>
				<Section>
					<Title>GuessPL</Title>
				</Section>
				<Section align="end" toolbar>
					{#if $authStore?.userName}
						<IconButton class="material-icons" on:click={() => menu.setOpen(true)}
							>account_circle</IconButton
						>
						<Menu bind:this={menu}>
							<List>
								<Item
									on:SMUI:action={() => {
										signout();
									}}
								>
									<Text>Logout</Text>
								</Item>
							</List>
						</Menu>
					{/if}
				</Section>
			</Row>
		</TopAppBar>
	</div>
	<slot />
	<footer>
		<nav>
			<a href="/">
				<i class="icon-home" />
				<span>Home</span>
			</a>
			<a href="/matches">
				<i class="icon-list-bullet" />
				<span>Matches</span>
			</a>
			<a href="/leaderboard">
				<i class="icon-award" />
				<span>Leaders</span>
			</a>
		</nav>
	</footer>
{/if}

<style>
	@import url('/static/fonts/icons/css/fontello.css');
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&family=Sofia+Sans+Extra+Condensed&display=swap');

	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		font-family: sans-serif;
		left: 0;
		background: #e3e3e3;
		padding: 8px;
	}

	footer nav {
		display: flex;
		justify-content: space-around;
	}

	nav a {
		display: flex;
		text-decoration: none;
		flex-direction: column;
		align-items: center;
	}

	a i {
		font-size: 22px;
		color: rgb(79, 79, 79);
	}

	nav a span {
		text-transform: uppercase;
		font-size: 10px;
		color: rgb(79, 79, 79);
	}

	.top-app-bar-container {
		width: 100%;
		overflow: hidden;
	}

	.large-bg {
		height: 100vh;
		width: 100%;
		background-image: url('https://cricnerds.com/wp-content/uploads/2022/12/ipl-2023-trophy.png.webp');
		overflow: hidden;
		background-position: bottom;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
