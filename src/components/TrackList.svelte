<script lang="ts">
	import Post from './Post.svelte';
	import { fade } from 'svelte/transition';
	import { test_tracks } from '../stores/player';

	import type { Track } from '../types';
	let tracks: Track[] = test_tracks.items;
	let loading = false;
</script>

<style>
	.g {
		overflow-y: auto !important;
		overflow: overlay;
		max-height: 60vh !important;
	}
</style>

<div class="tile is-parent is-vertical">
	<div class="level">
		<h1 class="level-left is-size-3">What are your top songs?</h1>
	</div>
	{#if loading}
		<progress class="progress is-small is-primary" max="100">15%</progress>
	{:else}
		<div transition:fade class="g">
			{#each tracks as track, i}
				<Post currentSong={track} />
			{/each}
		</div>
	{/if}
</div>
