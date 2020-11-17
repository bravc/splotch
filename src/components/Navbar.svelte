<script>
	import { link } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active';
	import { user } from '../stores/user';
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

							<button
								on:click={() => {
									user.logout();
								}}
								class="button is-warning is-light">
								Logout
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</nav>
</div>

<!-- </section> -->
