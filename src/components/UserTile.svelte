<script>
	import { user } from '../stores/user';
</script>

<div class="tile is-parent is-2">
	<div class="tile is-child box notification is-primary is-vcentered">
			<figure><img src={$user.profile_url ? $user.profile_url : ""} alt="album art" /></figure>
			{#if $user}
				<p class="title">{$user.username}</p>
			{/if}
	</div>
</div>
