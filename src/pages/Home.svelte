<script lang="ts">
	import Recent from '../components/Recent.svelte';
	import SpotifyPlayer from '../components/SpotifyPlayer.svelte';
	import Top from '../components/Top.svelte';
	import UserTile from '../components/UserTile.svelte';
	import Following from '../components/Following.svelte';
</script>



<div class="hero-body">
	<div class="container-fluid is-primary">
		<div class="tile is-ancestor">
			<UserTile />
			<SpotifyPlayer />
			<Following />
		</div>
		<div class="tile is-ancestor">
			<Recent />
			<Top />
		</div>
	</div>
</div>
