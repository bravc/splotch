<script lang="ts">
	import Post from './Post.svelte';
	import { access_token, spotify_token } from '../stores/user';
	import { device_id } from '../stores/player';
	import { onMount } from 'svelte';
	import type { Track, RecentTrack } from '../types';
	import { apiRequest, HttpVerb } from '../api/utils';

	const apiUrl = __myapp.env.API_URL;
	let tracks = [];
	let time_range = 'short_term';
	let loading = false;

	onMount(async () => {
		await topTracks();
	});

	let playSongs = async (e) => {
		let res = await apiRequest(
			`https://api.spotify.com/v1/me/player/play?device_id=${$device_id}`,
			HttpVerb.PUT,
			$spotify_token,
			{
				uris: tracks.map((t) => t.uri),
			}
		);
		console.log(res);
	};

	let topTracks = async (): Promise<Track[]> => {
		console.log(time_range);
		loading = true;
		let res = await fetch(`${apiUrl}/api/top?time_range=${time_range}`, {
			method: 'GET',
			mode: 'cors',
			headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${$access_token}` }),
		});
		let json = await res.json();
		console.log(json);

		tracks = json.items;
		loading = false;
		return json.items;
	};
</script>

<!-- svelte-ignore a11y-no-onchange -->
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

		<div class="level-right">
			<button on:click={playSongs} class="button level-item is-rounded is-outlined"><i class="fas fa-save" /></button>
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
		</div>
	</div>
	{#if loading}
		<progress class="progress is-small is-primary" max="100">15%</progress>
	{:else}
		<div class="g">
			{#each tracks as track, i}
				<Post currentSong={track} />
			{/each}
		</div>
	{/if}
</div>
