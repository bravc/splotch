<script lang="ts">
	import { onMount } from 'svelte';

	import { access_token, spotify_token } from '../stores/user';
	import { device_id, test_tracks } from '../stores/player';
	import type { Track } from '../types';
	import { apiRequest, HttpVerb } from '../api/utils';
	import TrackList from './TrackList.svelte';
	import { slide } from 'svelte/transition';

	import Post from './Post.svelte';
	import { track_end_position, track_start_position } from '../stores/current_track';

	let tracks: Track[] = [];
	let loading = false;

	onMount(async () => {
		await topTracks();
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

	const apiUrl = __myapp.env.API_URL;
	let time_range = 'short_term';

	let topTracks = async () => {
		loading = true;
		let json: { items: Track[] } = await apiRequest(
			`${apiUrl}/api/top?time_range=${time_range}`,
			HttpVerb.GET,
			$access_token
		);
		loading = false;

		tracks = json.items;
	};

	let exportToPlaylist = async () => {
		let name = prompt("Please enter your Playlist name", "Cool Playlist");
		let res: Response = await apiRequest(
			`${apiUrl}/api/playlist`,
			HttpVerb.POST,
			$access_token,
			{
				name: name,
				tracks: tracks.map(t => t.uri)
			}
		);
		alert('Playlist created!')
	}
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
		<h1 class="level-left is-size-3">Your Top Tracks</h1>
		<div class="level-right">
			<button on:click={exportToPlaylist}  class="button level-item is-dark is-rounded"><i class="fas fa-save" /></button>
			<div class="level-item control has-icons-left">
				<div class="select level-item select is-rounded">
					<select on:blur={() => topTracks()} bind:value={time_range}>
						<option selected={time_range == 'short_term'} value={'short_term'}>Short Term</option>
						<option selected={time_range == 'medium_term'} value={'medium_term'}>Medium Term</option>
						<option selected={time_range == 'long_term'} value={'long_term'}>Long Term</option>
					</select>
				</div>

				<div class="icon is-small is-left"><i class="fas fa-calendar-alt" /></div>
			</div>
		</div>	</div>
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

