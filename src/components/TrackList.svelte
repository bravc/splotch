<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	import Post from './Post.svelte';
	import { device_id, test_tracks } from '../stores/player';
	import type { Track } from '../types';
	import { apiRequest, HttpVerb } from '../api/utils';
	import { spotify_token } from '../stores/user';
	import { track_end_position, track_start_position } from '../stores/current_track';

	let tracks: Track[] = [];
	export let fetchFunc: () => Promise<Track[]>;
	let loading = false;

	onMount(async () => {
		loading = true;
		tracks = await fetchFunc();
		loading = false;
	});

	let playTrack = async (index: number) => {
		console.log(index);
		track_start_position.set(0);
		track_end_position.set(null);

		console.log(`Index is : ${index}`);
		let res = await apiRequest(
			`https://api.spotify.com/v1/me/player/play?device_id=${$device_id}`,
			HttpVerb.PUT,
			$spotify_token,
			{
				uris: tracks.filter((t, i) => i >= index).map((t) => t.uri),
			},
			false
		);
		console.log(res);
	};
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
		<div transition:slide class="g">
			{#each tracks as track, i}
				<Post currentSong={track} index={i} {playTrack} />
			{/each}
		</div>
	{/if}
</div>
