<script lang="ts">
	import { track } from '../stores/current_track';
	import type { Track } from '../types';

	export let rowTrack: Track;
</script>

<span>
	{#if $track && $track.name == rowTrack.name}<i class="fas fa-play" />{/if}
</span>
