<script lang="ts">
    import { onMount } from 'svelte';
	import { initDatabase } from '../../client/db';


    let userList = [];

    onMount(async ()=>{
        const { getUserList} = initDatabase();
        userList = await getUserList();
    })

</script>

<div class="heading">Leaderboard</div>

{#each userList as result}
    <div class="user-row">
        <div>{result.userName}</div> 
        <div>0</div>
    </div>
{/each}

<style>
    .heading {
		font-family: 'Noto Sans', sans-serif;
		font-size: 24px;
		margin-left: 16px;
		margin-top: 12px;
	}

    .user-row{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        width: 200px;
        justify-content: space-between;
        margin-left: 16px;
        margin-top: 20px;;
    }
</style>