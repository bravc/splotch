<script>
	import { link, push } from 'svelte-spa-router';
	import Router from 'svelte-spa-router';
	import active from 'svelte-spa-router/active';
	import { user } from '../stores/user';
	import Home from '../pages/Home.svelte';
	import About from '../pages/About.svelte';
	import Login from '../pages/Login.svelte';

	const routes = {
		'/': Home,
		'/about': About,
		'/login': Login,
	};
	const prefix = '';

	const client_id = __myapp.env.SPOT_CLIENT_ID;
	const apiUrl = __myapp.env.API_URL;

	let query_string = new URLSearchParams({
		client_id: client_id,
		response_type: 'code',
		state: $user ? $user.id : '',
		redirect_uri: `${apiUrl}/auth/spotify/callback`,
		scope:
			'user-read-recently-played user-top-read user-read-recently-played user-read-private streaming user-read-email',
	}).toString();
</script>

<style>
</style>

<div class="hero-head">
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand"><a class="navbar-item title" href="/" use:link><i class="fas fa-music" />Splotch</a></div>

		<div id="navbarBasicExample" class="navbar-menu">
			<div class="navbar-start">
				<a class="navbar-item" href="/about" use:link use:active={{ className: 'is-active' }}>About</a>
			</div>

			<div class="navbar-end">
				<div class="navbar-item">
					<div class="buttons">
						{#if $user == null}
							<a class="button is-primary" use:link href="/login"> <strong>Log in</strong> </a>
						{:else}
							<p class="navbar-item is-vcentered">
								<i class="fas fa-user" />
								<bold class="pl-1">{$user.username}</bold>
							</p>

							<a
								on:click={() => {
									user.logout();
								}}
								use:link
								href="/login"
								class="button is-warning is-light">
								Logout
							</a>
							{#if !$user.spotify_refresh}
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
<Router {routes} {prefix} />

<!-- </section> -->
