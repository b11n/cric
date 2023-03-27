<script lang="ts">
    import dayjs from 'dayjs'
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime)


    export let ts:Date|null = null;
    let displayStr = '';

    if(ts) {
        let now = dayjs();
        let matchtime = dayjs(ts);
        displayStr = now.to(matchtime);
    }else {
        throw new Error("Component initialized without ts")
    }

</script>

