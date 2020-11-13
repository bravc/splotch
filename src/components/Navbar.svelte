<script>
	import { link, push } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active';
	import { user } from '../store';
	let query_string = new URLSearchParams({
		client_id: 'd71d26149e4c4ba4b118868ad225bfa2',
		response_type: 'code',
		state: $user ? $user.id : '',
		redirect_uri: 'http://localhost:8080/auth/spotify/callback',
		scope: 'user-read-recently-played user-top-read user-read-recently-played user-read-private streaming user-read-email',
	}).toString();
</script>

<style>
</style>

	<div class="hero-head">
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<a class="navbar-item title" href="/" use:link><i class="fas fa-music" />Splotch</a>
			</div>

			<div id="navbarBasicExample" class="navbar-menu">
				<div class="navbar-start">
					<a class="navbar-item" href="/about" use:link use:active={{ className: 'is-active' }}>About</a>
				</div>

				<div class="navbar-end">
					<div class="navbar-item">
						<div class="buttons">
							{#if $user == null}
								<a href="/login" use:link class="button is-primary"> <strong>Log in</strong> </a>
							{:else}
								<p class="navbar-item is-vcentered"><i class="fas fa-user" /> <bold class="pl-1">{$user.username}</bold></p>

								<button
									on:click={() => {
										user.logout();
										push('/login');
									}}
									class="button is-warning is-light">
									Logout
								</button>
								{#if $user.spotify_refresh}
								<a href="https://accounts.spotify.com/authorize?{query_string}" class="button is-light">
									Connect Spotify
								</a>
								{/if}
							{/if}
						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>
<!-- </section> -->
