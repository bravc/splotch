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
	<article on:click={playSong} class="is-primary notification is-clickable box">
		<article class="media">
			<figure class="media-left">
				<p class="image is-64x64"><img src={currentSong.album.images[0].url} alt="" /></p>
			</figure>
			<div class="media-content">
				<div class="content">
					<p class="title is-4"><strong>{currentSong.name}</strong></p>
					<p class="subtitle">{currentSong.artists[0].name}</p>
				</div>
			</div>
			<div class="media-right">
				<div class="content">
					<div class="dropdown">
						<div class="dropdown-trigger">
							<button class="button is-outline is-transparent" aria-haspopup="true" aria-controls="dropdown-menu">
								<!-- <span>Dropdown button</span> -->
								<span class="icon is-small"> <i class="fas fa-ellipsis-h" aria-hidden="true" /> </span>
							</button>
						</div>
						<div class="dropdown-menu" id="dropdown-menu" role="menu">
							<div class="dropdown-content">
								<a href="#" class="dropdown-item"> Dropdown item </a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	</article>
</div>
