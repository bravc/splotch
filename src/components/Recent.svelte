<script lang="ts">
	import Post from './Post.svelte';
	import { access_token } from '../stores/user';
	import type { Track, RecentTrack } from '../types';

	let recentTracks = async (): Promise<RecentTrack[]> => {
		let res = await fetch('http://localhost:8080/api/recent', {
			method: 'GET',
			mode: 'cors',
			headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${$access_token}` }),
		});
		console.log(res);
		let json = await res.json();
		return json.items;
	};
</script>

<style>
	.g {
		overflow-y: auto !important;
		overflow: overlay;
		max-height: 60vh !important;
	}
</style>

<div class="tile is-parent is-vertical">
	<div class="level">
		<p class="level-left title">What are your recent songs?</p>
	</div>
	{#await recentTracks()}
		<progress class="progress is-small is-primary" max="100">15%</progress>
	{:then tracks}
		<div class="g">
			{#each tracks as track, i}
				<Post currentSong={track.track} />
			{/each}
		</div>
	{:catch error}
		<div class="notification is-danger">An error occurred fetching the data.</div>
	{/await}
</div>
