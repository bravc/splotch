<script lang="ts">
	import Post from './Post.svelte';
	// import { user } from '../store';
	// import { onMount } from 'svelte';

	import type { Track, RecentTrack } from '../types';
	let tracks: Track[] = [];
	let time_range = 'short_term';
	let loading = false;

	// onMount(async () => {
	// 	await topTracks();
	// });

	// let topTracks = async (): Promise<Track[]> => {
	// 	console.log(time_range);
	// 	loading = true;
	// 	let res = await fetch(`http://localhost:8080/api/top?time_range=${time_range}`, {
	// 		method: 'GET',
	// 		mode: 'cors',
	// 		headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${$user.access_token}` }),
	// 	});
	// 	console.log(res);
	// 	let json = await res.json();
	// 	tracks = json.items;
	// 	loading = false;
	// 	return json.items;
	// };
</script>

<!-- svelte-ignore a11y-no-onchange -->
<style>
	.g {
		overflow-y: auto !important;
		overflow: overlay;
		max-height: 60vh !important;
	}
</style>

<div class="tile is-parent is-vertical">
	<div class="level">
		<h1 class="level-left is-size-3">What are your top songs?</h1>

		<!-- <div class="level-right">
			<button class="button level-item is-rounded is-outlined"><i class="fas fa-save" /></button>
			<div class="level-item control has-icons-left">
				<div class="select level-item select is-rounded">
					<select on:blur={() => topTracks()} bind:value={time_range}>
						<option selected={time_range == 'short_term'} value={'short_term'}>Short Term</option>
						<option selected={time_range == 'medium_term'} value={'medium_term'}>Medium Term</option>
						<option selected={time_range == 'long_term'} value={'long_term'}>Long Term</option>
					</select>
				</div>

				<div class="icon is-small is-left"><i class="fas fa-calendar-alt" /></div>
			</div>
		</div> -->
	</div>
	{#if loading}
		<progress class="progress is-small is-primary" max="100">15%</progress>
	{:else}
		<div class="g">
			{#each tracks as track, i}
				<Post currentSong={track} />
			{/each}
		</div>
	{/if}
</div>
