<script lang="ts">
	import Router from 'svelte-spa-router';
	import Navbar from './components/Navbar.svelte';

	const routes = {
		'/*': Navbar,
	};
</script>

<section class="hero is-success is-fullheight">
	<Router {routes} />
	<footer class="hero-foot">
		<div class="content has-text-centered">
			<p>
				<strong>Splotch</strong>
				by
				<a href="https://github.com/bravc">Cameron Braverman</a>. The source code is licensed
			</p>
		</div>
	</footer>
</section>
