<script lang="ts">
	import { device_id, player, waitForSpot } from '../stores/player';
	import { track_position, track } from '../stores/current_track';
	import { onMount } from 'svelte';

	let playing = false;
	let seeking = false;
	$: playerIcon = `<i class="${playing ? 'fas fa-pause' : 'fas fa-play'}" />`;

	const toPrettyTimestamp = (duration) => {
		if (duration) {
			let seconds = ((duration % 60000) / 1000).toFixed(0);
			return `${Math.trunc(duration / 60000)}:${(seconds < 10 ? '0' : '') + seconds}`;
		}
		return '-:--';
	};

	const interval = setInterval(() => {
		if (playing && !seeking) {
			console.log(($track_position / 60000).toString().slice(2, 4));
			$track_position += 10;
		}
	}, 10);

	onMount(async () => {
		const { Player } = await waitForSpot();
		player.setPlayer(Player);
		$player.addListener('player_state_changed', ({ position, paused, duration, track_window: { current_track } }) => {
			if ($track && $track.name != current_track.name) {
				$track_position = 0;
			}
			track.set(current_track);

			playing = !paused;
		});

		$player.addListener('ready', (ready) => {
			device_id.set(ready.device_id);
			console.log('Ready with Device ID', device_id);
		});
	});
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="tile is-parent is-6">
	<article class="tile box is-child notification is-primary">
		<p class="title">What are you listening to?</p>
		<article class="level">
			<figure class="media-left">
				<p class="image is-128x128">
					<img
						src={$track ? $track.album.images[0].url : 'https://bulma.io/images/placeholders/128x128.png'}
						alt="album art" />
				</p>
			</figure>
			<div class="media-content">
				<div class="columns is-vcentered">
					<div class="column is-3">
						<p class="title is-4"><strong>{$track ? $track.name : '-'}</strong></p>
						<p class="subtitle">{$track ? $track.artists[0].name : '-'}</p>
					</div>
					<div class="column is-vcentered is-centered">
						<div class="level is-mobile">
							<div class="level-left">
								<p class="pr-2">{toPrettyTimestamp($track ? $track_position : 0)}</p>
							</div>

							<input
								class="slider media-content is-fullwidth is-circle"
								on:mousedown={() => {
									seeking = true;
								}}
								on:mouseup={() => {
									console.log(`Position is: ${$track_position}`);
									console.log(`Timestamp is: ${($track_position / 100) * $track.duration_ms}`);
									$player.seek($track_position).then(() => {
										console.log('Changed position!');
									});
									seeking = false;
								}}
								type="range"
								min="0"
								max={$track ? $track.duration_ms : 0}
								bind:value={$track_position} />
							<div class="level-right">
								<p class="pl-2">{toPrettyTimestamp($track ? $track.duration_ms : undefined)}</p>
							</div>
						</div>
						<div class="level">
							<a on:click={() => console.log('df')} class="level-item"><span class="icon is-small"><i
										class="fas fa-backward" /></span></a>
							<a
								on:click={() => $player.togglePlay().then(() => {
										playing = !playing;
										console.log('Toggled playback!');
									})}
								class="level-item"><span class="icon is-small">{@html playerIcon}</span></a>
							<a on:click={() => console.log('df')} class="level-item"><span class="icon is-small"><i
										class="fas fa-forward" /></span></a>
						</div>
					</div>
				</div>
			</div>
		</article>
	</article>
</div>
