<!-- <div class="tile is-parent">
	<nav class="level tile box is-child is-mobile is-primary notification">
		<div class="level-item has-text-centered">
			<div>
				<p class="heading">Playlists</p>
				<p class="title">56</p>
			</div>
		</div>
		<div class="level-item has-text-centered">
			<div>
				<p class="heading">Following</p>
				<p class="title">123</p>
			</div>
		</div>
		<div class="level-item has-text-centered">
			<div>
				<p class="heading">Followers</p>
				<p class="title">456K</p>
			</div>
		</div>
	</nav>
</div> -->
<script>
	import { track_position, track } from '../stores/current_track';
	import { player } from '../stores/player';

	let start_time = 0;
	let end_time = 0;

	let start_part = () =>
		$player.seek(start_time).then(() => {
			$track_position = start_time;
			console.log('Changed position!');
		});
</script>

<div class="tile is-parent">
	<div class="level tile box is-child is-mobile is-primary notification">
		<div class="level level-item">
			<div class="level-item">
				<input type="text" value={start_time} /><button on:click={() => (start_time = $track_position)}>Mark</button>
			</div>
			<button on:click={start_part} class="level-item">Create Snippet</button>
			<div class="level-item">
				<input type="text" value={end_time} /><button on:click={() => (end_time = $track_position)}>Mark</button>
			</div>
		</div>
	</div>
</div>
