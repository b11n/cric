<style>

    .heading {
        font-family: 'Noto Sans', sans-serif;
        font-size: 24px;
    }
</style>

<script lang="ts">
      import { auth } from "../store/auth";


</script>

<div class="heading">
    {#if $auth}
        Welcome {$auth.userName}
    {/if}
    
</div>

<div class="heading">
    Upcoming Matches
</div>

<div class="heading">
    Your Bets
</div>