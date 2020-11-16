<script lang="ts">
	import { track_position, track } from '../stores/current_track';
	import { player } from '../stores/player';

	let start_time = 0;
	let end_time = 0;
	$: pretty_start = toPrettyTimestamp(start_time);
	$: pretty_end = toPrettyTimestamp(end_time);

	let start_part = () =>
		$player.seek(start_time).then(() => {
			$track_position = start_time;
			console.log('Changed position!');
		});

	const toPrettyTimestamp = (duration) => {
		if (duration) {
			let seconds = ((duration % 60000) / 1000).toFixed(0);
			return `${Math.trunc(duration / 60000)}:${(seconds < 10 ? '0' : '') + seconds}`;
		}
		return '-:--';
	};

	const convertToTimestamp = (timestamp: string) => {
		let minutes = parseInt(timestamp.slice(0, 1));
		let seconds = parseInt(timestamp.slice(1));

		let total = minutes + seconds * 60;
		console.log(total);
		console.log(total * 60000);
	};
</script>

<div class="tile is-parent">
	<div class="tile box is-child is-mobile is-warning notification">
		<p class="title">Add a sound snippet</p>
		<div class="columns">
			<div class="column is-full field-group">
				<div class="field has-addons">
					<!-- <div class="field-label"><label for="" class="label">Start Time</label></div> -->
					<div class="control"><input class="input is-small is-rounded" type="text" value={pretty_start} /></div>
					<div class="control">
						<button on:click={() => (start_time = $track_position)} class="button is-small is-rounded"><i
								class="fas fa-clock" /></button>
					</div>
				</div>
				<div class="field has-addons">
					<!-- <div class="field-label"><label for="" class="label">Start Time</label></div> -->
					<div class="control"><input class="input is-small is-rounded" type="text" value={pretty_end} /></div>
					<div class="control">
						<button on:click={() => (end_time = $track_position)} class="button is-small is-rounded"><i
								class="fas fa-clock" /></button>
					</div>
				</div>
			</div>
		</div>

		<button on:click={start_part} class="button is-rounded is-small">Create Snippet</button>
	</div>
</div>
