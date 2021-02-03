<script lang="ts">
	import { player, waitForSpot, seeking, playing, repeat } from '../stores/player';
	import { track_position, track, track_start_position, track_end_position } from '../stores/current_track';
	import { onMount } from 'svelte';
	import SnippetModal from './SnippetModal.svelte';

	let showing = false;
	$: playerIcon = `<i class="${$playing ? 'far fa-pause-circle fa-2x' : 'far fa-play-circle fa-2x'}" />`;

	const toPrettyTimestamp = (duration) => {
		if (duration) {
			let seconds = ((duration % 60000) / 1000).toFixed(0);
			return `${Math.trunc(duration / 60000)}:${(seconds < 10 ? '0' : '') + seconds}`;
		}
		return '-:--';
	};

	setInterval(() => {
		let isSnippetOver = $track_end_position ? $track_end_position <= $track_position : false;
		let isTrackOver = $track ? $track_position >= $track.duration_ms : false;

		if (isSnippetOver && !$repeat) {
			$player.pause();
		} else if (isSnippetOver && $repeat) {
			$track_position = $track_start_position;
			$player.seek($track_position).then(() => {
				console.log('Changed position!');
			});
		}
		if (isTrackOver && $repeat) {
			$track_position = 0;
			$player.seek($track_position).then(() => {
				console.log('Changed position!');
			});
		}

		if ($playing && !$seeking && !isSnippetOver) {
			$track_position += 10;
		}
	}, 10);

	let openSnippetModal = async () => {
		await $player.pause();
		playing.set(false);
		showing = true;
	};

	onMount(async () => {
		const { Player } = await waitForSpot();
		player.setPlayer(Player);
	});
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="tile is-parent">
	<article class="tile box is-child notification is-primary">
		<!-- <p class="title">What are you listening to?</p> -->
		<article class="columns is-vcentered">
			<figure class="column is-3">
				<img
					height="200px"
					width="200px"
					src={$track ? $track.album.images[0].url : 'https://bulma.io/images/placeholders/128x128.png'}
					alt="album art"
				/>
				<p class="title is-4"><strong>{$track ? $track.name : '-'}</strong></p>
				<p class="subtitle">{$track ? $track.artists[0].name : '-'}</p>
			</figure>
			<div class="column">
				<div class="columns is-vcentered">
					<div class="column is-vcentered">
						<div class="level is-mobile">
							<div class="level-left">
								<p class="pr-2">{toPrettyTimestamp($track ? $track_position : 0)}</p>
							</div>

							<input
								class="slider media-content is-fullwidth is-circle"
								on:mousedown={() => {
									$seeking = true;
								}}
								on:mouseup={() => {
									console.log(`Position is: ${$track_position}`);
									console.log(`Timestamp is: ${($track_position / 100) * $track.duration_ms}`);
									$player.seek($track_position).then(() => {
										console.log('Changed position!');
									});
									$seeking = false;
								}}
								type="range"
								min={$track_start_position}
								max={$track_end_position ? $track_end_position : $track ? $track.duration_ms : 0}
								bind:value={$track_position}
							/>
							<div class="level-right">
								<p class="pl-2">
									{toPrettyTimestamp(
										$track_end_position ? $track_end_position : $track ? $track.duration_ms : undefined
									)}
								</p>
							</div>
						</div>
						<div class="level">
							<a on:click={() => openSnippetModal()} class={`level-item ${!$track ? 'disabled' : ''}`}
								><span class="icon"><i class="fas fa-cut" /></span></a
							>
							<div class="modal {showing ? 'is-active' : ''}">
								<div on:click={() => (showing = false)} class="modal-background" />
								<SnippetModal />
							</div>
							<a on:click={() => $player.previousTrack()} class="level-item"
								><span class="icon"><i class="fas fa-backward" /></span></a
							>
							<a
								on:click={() =>
									$player.togglePlay().then(() => {
										$playing = !$playing;
										console.log('Toggled playback!');
									})}
								class="level-item"><span class="icon">{@html playerIcon}</span></a
							>
							<a on:click={() => $player.nextTrack()} class="level-item"
								><span class="icon"><i class="fas fa-forward" /></span></a
							>
							<a on:click={() => ($repeat = !$repeat)} class="level-item"
								><span class={`icon ${$repeat ? 'has-text-success-dark' : ''}`}><i class={'fas fa-redo'} /></span></a
							>
						</div>
					</div>
				</div>
			</div>
		</article>
	</article>
</div>

<style>
	a.disabled {
		pointer-events: none;
		opacity: 0.6;
	}
</style>
