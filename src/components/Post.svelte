<script lang="ts">
	import { apiRequest, HttpVerb } from '../api/utils';
	import { spotify_token } from '../stores/user';
	import { device_id } from '../stores/player';

	import type { Track } from '../types';
	import Login from '../pages/Login.svelte';
	let dropdownActive = false;
	export let currentSong: Track;

	let playSong = async (e) => {
		let res = await apiRequest(
			`https://api.spotify.com/v1/me/player/play?device_id=${$device_id}`,
			HttpVerb.PUT,
			$spotify_token,
			{
				uris: [currentSong.uri],
			},
			false
		);
		console.log(res);
	};
	$: console.log(dropdownActive);
</script>


<div class="tile pb-4 is-child">
	<article class="is-primary notification is-clickable box">
		<article class="media">
			<figure class="media-left">
				<p class="image is-64x64"><img src={currentSong.album.images[0].url} alt="" /></p>
			</figure>
			<div on:click={playSong} class="media-content">
				<div class="content">
					<p class="title is-4"><strong>{currentSong.name}</strong></p>
					<p class="subtitle">{currentSong.artists[0].name}</p>
				</div>
			</div>
			<div class="media-right">
				<div class="content">
					<div on:blur={() => (dropdownActive = false)} class="dropdown is-right {dropdownActive ? 'is-active' : ''}">
						<div on:blur={() => (dropdownActive = false)} class="dropdown-trigger">
							<div class="">
								<span
									on:click={() => (dropdownActive = !dropdownActive)}
									
									class="icon is-large"
									aria-haspopup="true"
									aria-controls="dropdown-menu6">
									<i class="fas fa-ellipsis-h" aria-hidden="true" />
								</span>
							</div>
						</div>
						<div class="dropdown-menu is-dark" id="dropdown-menu" role="menu">
							<div class="is-dark dropdown-content">
								<div on:blur={() => (dropdownActive = false)} on:click={() => (dropdownActive = false)} class="is-dark dropdown-item">Add to queue</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	</article>
</div>
