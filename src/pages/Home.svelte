<script lang="ts">
	import { link } from 'svelte-spa-router';

	import SpotifyPlayer from '../components/SpotifyPlayer.svelte';
	import Top from '../components/Top.svelte';
	import UserTile from '../components/UserTile.svelte';
	import TrackList from '../components/TrackList.svelte';
	import { access_token, spotify_token } from '../stores/user';
	import SnippetForm from '../components/SnippetForm.svelte';
	import { test_tracks } from '../stores/player';
	import SnippetList from '../components/SnippetList.svelte';
</script>

<style>
</style>

{#if $access_token}
	<div class="hero-body">
		<div class="container is-fluid is-primary">
			<div class="tile is-ancestor">
				<UserTile />
				<SpotifyPlayer />
				<SnippetForm />
			</div>
			<div class="tile is-ancestor">
				<!-- <TrackList /> -->
				<Top />
				<SnippetList />
			</div>
		</div>
	</div>
{:else}
	<div class="container is-fluid has-text-centered">
		<div class="notification is-danger">
			<h1 class="title">You're not logged in!</h1>
			<a class="button is-link" href="/login" use:link>Login</a>
		</div>
	</div>
{/if}
