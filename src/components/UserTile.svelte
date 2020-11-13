<script>
	import { user } from '../store';
</script>

<div class="tile is-parent is-primary is-2">
	<div class="tile is-child box notification is-primary columns is-vcentered">
		<div class="column">
			<figure><img src="profile.jpg" alt="album art" /></figure>
		</div>
		<div class="column">
			<p class="title">{$user.username}</p>
			<p class="subtitle">{$user.email}</p>
		</div>
	</div>
</div>
