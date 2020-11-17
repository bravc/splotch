<script>
	import { user } from '../stores/user';
</script>

<div class="tile is-parent is-2">
	<div class="tile is-child box notification is-primary columns is-vcentered">
		<div class="column">
			<figure><img src="profile.jpg" alt="album art" /></figure>
		</div>
		<div class="column">
			{#if $user}
				<p class="title">{$user.username}</p>
				<p class="subtitle">{$user.email}</p>
			{/if}
		</div>
	</div>
</div>
