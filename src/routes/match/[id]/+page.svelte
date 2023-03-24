<script lang="ts">
  import { page } from '$app/stores'
  import {matches} from '../../../../data/matches'

  const match = matches[parseInt($page.params.id)]

</script>

<div>{match.date}</div>
<img src="https://scores.iplt20.com/ipl/teamlogos/{match.homeCode
}.png?v=2" alt="">
<div>{match.home} vs {match.away}</div>

<img src="https://scores.iplt20.com/ipl/teamlogos/{match.awayCode
}.png?v=2" alt="">