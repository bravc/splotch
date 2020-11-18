<script lang="ts">
	import type { Track } from '../types';
	import PlayingIcon from './PlayingIcon.svelte';
	export let index: number;
	export let playTrack: (number: number) => Promise<void>;
	export let currentSong: Track;

	let dropdownActive = false;

	$: console.log(dropdownActive);
</script>

<div class="tile pb-4 is-child">
	<article class="is-primary notification is-clickable box">
		<article class="media">
			<figure class="media-left">
				<p class="image is-64x64">
					<!-- <PlayingIcon rowTrack={currentSong} /> -->
					<img src={currentSong.album.images[0].url} alt="" />
				</p>
			</figure>
			<div on:click={() => playTrack(index)} class="media-content">
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
								<div
									on:blur={() => (dropdownActive = false)}
									on:click={() => (dropdownActive = false)}
									class="is-dark dropdown-item">
									Add to queue
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	</article>
</div>
