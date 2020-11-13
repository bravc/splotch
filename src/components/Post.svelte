<script lang="ts">
	import { apiRequest, HttpVerb } from '../api/utils';
	import { spotify_token } from '../stores/user';
	import { device_id } from '../stores/player';

	import type { Track } from '../types';
	export let currentSong: Track;

	let playSong = async (e) => {
		let res = await apiRequest(
			`https://api.spotify.com/v1/me/player/play?device_id=${$device_id}`,
			HttpVerb.PUT,
			$spotify_token,
			{
				uris: [currentSong.uri],
			}
		);
		console.log(res);
	};
</script>

<div class="tile pb-4 is-child">
	<article class="is-primary notification is-clickable box">
		<article class="media">
			<figure class="media-left">
				<p class="image is-64x64">
					<a href={`https://open.spotify.com/track/${currentSong.id}`}><img
							src={currentSong.album.images[0].url}
							alt="" /></a>
				</p>
			</figure>
			<div on:click={playSong} class="media-content">
				<div class="content">
					<p class="title is-4"><strong>{currentSong.name}</strong></p>
					<p class="subtitle">{currentSong.artists[0].name}</p>
				</div>
			</div>
		</article>
	</article>
</div>
