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
    let isRegisteredOnServer = false;
	let showNofiticationAlert = false;

	function hasPermissionGranted() {
		if (!('Notification' in window)) {
			return false;
		} else if (Notification.permission === 'granted') {
			return true;
		} else if (Notification.permission !== 'denied') {
            return false;
		} else {
            return false;
		}
	}

    function dismiss(){
        isRegisteredOnServer = false;
    }

	onMount(async () => {
		const { getRegistrationToken } = initMessaging();
		const { registerToken,getTokenList } = initDatabase();
        const user = get(authStore);

		const isNotificationFeatureEnabled = await isFeatureEnabled('NOTIFICATION');
        const registered = hasPermissionGranted();

        if(registered) {
            const token = (await getRegistrationToken()) as string;
            const registeredTokens = await getTokenList(user?.uid || '') ;
            if(registeredTokens.indexOf(token) > -1) {
                showNofiticationAlert = false
            }else {
                showNofiticationAlert = true && isNotificationFeatureEnabled;
            }
        }else {
            showNofiticationAlert = isNotificationFeatureEnabled;
        }

		enableNotifications = async () => {
			const token = (await getRegistrationToken()) as string;
			await registerToken(user?.uid || '', token);
            showNofiticationAlert = false;
            isRegisteredOnServer = true;
		};
	});
</script>

{#if showNofiticationAlert}

	<Alert>
		<div slot="header">Enable Notifications</div>
        <div slot="icon" class="icon"> 
            <div class="icon">
                <img src="/images/notif.png" alt="" />
            </div>
            </div>
       
		<div slot="body">
			Enable notifications to alert you before a match starts if you havent entered your
			predictions.
		</div>
		<div slot="actions">
			<Button on:click={enableNotifications}>Enable Notifications</Button>
		</div>
	</Alert>
{:else if isRegisteredOnServer }
<Alert>
    <div slot="header">Notifications enabled</div>
    
    <div slot="icon" class="icon">
        <div class="icon">
            <img src="/images/tick.png" alt="">
        </div>
        
    </div>
    <div slot="body">
        You have enabled notifications
    </div>
    <div slot="actions">
        <Button on:click={dismiss}>Dismiss</Button>
    </div>
</Alert>
{/if}


<style>
	.icon {
		display: flex;
		justify-content: center;
        width: 64px;
        height: 64px;
	}
</style>
