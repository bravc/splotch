<script lang="ts">
	import { onMount } from 'svelte';
	import { spotify_token } from '../stores/user';
	import { apiRequest, HttpVerb } from '../api/utils';
	import type { Snippet, Track } from '../types';
	import PlayingIcon from './PlayingIcon.svelte';
	import { player, waitForSpot, seeking, playing, device_id } from '../stores/player';
	import { track_position, track, track_start_position, track_end_position } from '../stores/current_track';

	export let snippet: Snippet;
	let current_track: Track;

	onMount(async () => {
		let t: Track = await apiRequest(
			`https://api.spotify.com/v1/tracks/${snippet.track_uri.split(':')[2]}`,
			HttpVerb.GET,
			$spotify_token
		);
		current_track = t;
	});

	let playSnippet = async () => {
		track_start_position.set(snippet.timestamp_start);
		track_end_position.set(snippet.timestamp_end);
		let res = await apiRequest(
			`https://api.spotify.com/v1/me/player/play?device_id=${$device_id}`,
			HttpVerb.PUT,
			$spotify_token,
			{
				uris: [snippet.track_uri],
				position_ms: snippet.timestamp_start,
			},
			false
		);
		console.log(res);
	};
</script>

<div class="tile pb-4 is-child">
	<article class="is-primary notification is-clickable box">
		<article class="media">
			<figure class="media-left">
				<p class="image is-64x64"><img src={current_track ? current_track.album.images[0].url : ''} alt="" /></p>
			</figure>
			<div on:click={playSnippet} class="media-content">
				<div class="content">
					<p class="title is-4"><strong>{snippet.name}</strong></p>
					<p class="subtitle">{current_track ? current_track.name : ''}</p>
				</div>
			</div>
		</article>
	</article>
</div>
