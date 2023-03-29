<script lang="ts">
    import { onMount } from 'svelte';

     export let options:string[] = [];
     export let value = '';
     export let disabled = false;


</script>

<div class="wrap">
    <div class="select">
        <div class="placeholder">{value == '' ? 'Select player' : value}</div>
        <div class="arrow">
            <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
                <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
            </svg>
        </div>
    </div>
    <select name="" id="" bind:value={value} {disabled}>
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
</div>



<style>

    .wrap {
        position: relative;
    }

    select {
        position: absolute;
        opacity: .01;
        top: 0;
        display: block;
        width: 256px;
        height: 56px;
    }

    .select {
        font-family: sans-serif;
        font-size: 15px;
        border: 1px solid grey;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        min-height: 40px;
        align-items: center;
        padding: 8px;
        color: #666666;
        width: 240px;
    }

    svg {
        height: 14px;
        width: 14px;
        fill: #666666;
        margin: 0 12px
    }
</style>