<script lang="ts">
	import Alert from './alert.svelte';
	import Button, { Label } from '@smui/button';
	import { initMessaging } from '../client/messaging';
	import { onMount } from 'svelte';
	import { isFeatureEnabled } from '../client/features';
	import { initDatabase } from '../client/db';
    import { get } from 'svelte/store';
    import { auth as authStore } from '../store/auth';

	let enableNotifications = () => {};

    let showNofiticationAlert = false;

	onMount(async () => {
		const { getRegistrationToken } = initMessaging();
        const {registerToken}  = initDatabase();

        showNofiticationAlert = await isFeatureEnabled('NOTIFICATION');


		enableNotifications = async () => {
            const user = get(authStore);
			const token = await getRegistrationToken() as string;
            registerToken(user?.uid || '', token );
            console.log(token);
		};
	});
</script>

{#if showNofiticationAlert }
    <Alert>
        <div slot="header">Enable notifications</div>
        <div slot="body">
            Enable notifications to alert you before a match starts if you havent entered your predictions.
        </div>
        <div slot="actions">
            <Button on:click={enableNotifications}>Enable notifications</Button>
        </div>
    </Alert>
{/if}