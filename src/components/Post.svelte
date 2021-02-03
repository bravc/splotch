<script lang="ts">
	import type { Track } from '../types';
	import { track } from '../stores/current_track';
	export let index: number;
	export let playTrack: (number: number) => Promise<void>;
	export let currentSong: Track;

	$: isPlaying = $track ? $track.name == currentSong.name : false;
</script>

<div class="tile pb-4 is-child">
	<article class="is-primary notification is-clickable box">
		<article class="media">
			<figure class="media-left">
				<p class="image is-64x64">
					<img style={`${isPlaying ? 'opacity: 0.6' : ''}`} src={currentSong.album.images[0].url} alt="" />
				</p>
			</figure>
			<div on:click={() => playTrack(index)} class="media-content">
				<div class="content">
					<p class={`title is-4 ${isPlaying ? 'has-text-success-dark' : ''}`}><strong>{currentSong.name}</strong></p>
					<p class={`subtitle ${isPlaying ? 'has-text-success-dark' : ''}`}>{currentSong.artists[0].name}</p>
				</div>
			</div>
		</article>
	</article>
</div>
