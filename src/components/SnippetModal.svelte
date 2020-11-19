<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';
	import { onDestroy } from 'svelte';

	import { fade } from 'svelte/transition';
	import { player, playing as g_playing, seeking } from '../stores/player';
	import { track_position, track } from '../stores/current_track';
	import { apiRequest, HttpVerb } from '../api/utils';
	import { access_token } from '../stores/user';

	const apiUrl = __myapp.env.API_URL;
	let notification = false;
	let g = $track ? $track.duration_ms : 100;
	let timestamps = $track ? [0, g] : [0, 100];
	let original_start;
	let playing = false;
	let repeat = true;
	let snippetName = '';
	let tag = '';
	let tags = [];

	$: console.log(timestamps);
	$: playerIcon = `<i class="${playing ? 'fas fa-pause' : 'fas fa-play'}" />`;
	// $: track_position.set(timestamps[0]);
	$: timestampStart = timestamps[0];
	$: loopDone = timestamps[0] >= timestamps[1];
	$: validSubmit = timestamps[0] < timestamps[1] && snippetName !== '';

	onDestroy(() => {
		playing = false;
	});

	const toPrettyTimestamp = (duration) => {
		if (duration) {
			let seconds = ((duration % 60000) / 1000).toFixed(0);
			return `${Math.trunc(duration / 60000)}:${(seconds < 10 ? '0' : '') + seconds}`;
		}
		return '0:00';
	};

	setInterval(async () => {
		if (playing) {
			if (loopDone) {
				if (repeat) {
					timestamps[0] = original_start;
					$player.seek(original_start).then(() => {
						console.log('Changed position!');
						$player.togglePlay().then(() => {
							playing = true;
							console.log('playing in loop repeat');
						});
					});
				}
				console.log('donski');
				console.log(`Current timestamp is: ${timestampStart} og is: ${original_start}`);
				await $player.togglePlay();
				playing = false;
			}
			timestamps[0] += 10;
		}
	}, 10);

	let startPlayLoop = async () => {
		original_start = timestampStart;
		if ($track) {
			if (!playing) {
				$player.seek(timestampStart).then(() => {
					console.log('Changed position!');
					$player.togglePlay().then(() => {
						playing = true;
						console.log('playing in loop');
					});
				});
			} else {
				playing = false;
				$player.togglePlay().then(() => {
					console.log('paused');
				});
			}
		}
	};

	let create_snippet = async () => {
		await apiRequest(`${apiUrl}/api/snippet`, HttpVerb.POST, $access_token, {
			name: snippetName,
			timestamp_start: timestamps[0],
			timestamp_end: timestamps[1],
			track_uri: $track.uri,
		});
		notification = { title: 'Snippet Created!' };
	};
</script>

<style>
	#g .rangeHandle {
		background: black;
	}
	#g .rangeSlider {
		background: black;
		color: black;
	}
	.fa-redo {
		color: primary;
	}
	.rangeSlider > .rangePips > .pip {
		color: black;
	}
</style>

<div class="modal-content notification is-dark">
	{#if notification}
		<div class="container is-fluid has-text-centered">
			<div class="notification is-danger">
				<h1 class="title">{notification.title}</h1>
			</div>
		</div>
	{/if}

	<div class="title">Create a Snippet</div>
	<div class="subtitle">Track chosen: {$track ? $track.name : ''}</div>
	<div class="field">
		<label for="" class="label has-text-light">Snippet Name</label>
		<div class="control has-icons-left has-icons-right">
			<input class="input" type="text" bind:value={snippetName} placeholder="Snippet Name" />
			<span class="icon is-small is-left"> <i class="fas fa-cut" /> </span>
		</div>
	</div>
	<label for="" class="label has-text-light">Snippet Length</label>

	<div class="">
		<RangeSlider
			id="g"
			bind:values={timestamps}
			pips
			first="label"
			last="label"
			formatter={(v) => toPrettyTimestamp(v)}
			float
			pushy
			range={!playing}
			min={0}
			max={$track ? $track.duration_ms : 100} />
	</div>
	<div class="level">
		<span on:click={() => startPlayLoop()} class="level-item is-clickable icon is-small">{@html playerIcon}</span>
		<span on:click={() => (repeat = !repeat)} class="level-item is-clickable icon is-small"><i
				class="fas fa-redo" /></span>
	</div>
	<div class="field">
		<label for="" class="label has-text-light">Tags</label>
		<div class="control has-icons-left has-icons-right">
			<input
				on:keydown={(e) => {
					if (e.key === 'Enter' && !tags.includes(tag)) {
						tags = [...tags, tag];
						tag = '';
					}
				}}
				bind:value={tag}
				class="input"
				type="text"
				placeholder="Tag" />
			<span class="icon is-small is-left"> <i class="fas fa-tag" /> </span>
		</div>
	</div>

	<div class="field is-grouped is-grouped-multiline">
		{#each tags as tagg, i}
			<div transition:fade|local class="control">
				<div class="tags has-addons">
					<span class="tag is-primary">{tagg}</span><span
						on:click={() => {
							tags = tags.filter((t) => t != tagg);
						}}
						class="tag is-delete" />
				</div>
			</div>
		{/each}
	</div>
	<div class="field mu-10 is-grouped">
		<div class="control">
			<button disabled={!validSubmit} on:click={create_snippet} class="button is-link">Create</button>
		</div>
	</div>
</div>
<button class="modal-close is-large" aria-label="close" />
