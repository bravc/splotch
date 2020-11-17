<script lang="ts">
	import { link } from 'svelte-spa-router';

	import Recent from '../components/Recent.svelte';
	import SpotifyPlayer from '../components/SpotifyPlayer.svelte';
	import Top from '../components/Top.svelte';
	import UserTile from '../components/UserTile.svelte';
	import Following from '../components/Following.svelte';
	import TrackList from '../components/TrackList.svelte';
	import { access_token, spotify_token } from '../stores/user';
</script>

<div class="hero-body">
	<div class="container-fluid is-primary">
		{#if $access_token !== null}
			<div class="tile is-ancestor">
				<UserTile />
				<SpotifyPlayer />
				<Following />
			</div>
			<div class="tile is-ancestor">
				<!-- <Recent /> -->
				<!-- <TrackList /> -->
				<Top />
			</div>
		{:else}
			<a href="/login" use:link>Login</a>
		{/if}
	</div>
</div>
