<script lang="ts">
	import Router from 'svelte-spa-router';
	import Navbar from './components/Navbar.svelte';
	import Home from './pages/Home.svelte';
	import About from './pages/About.svelte';
	import Login from './pages/Login.svelte';

	const routes = {
		'/about': About,
		'/login': Login,

		'/': Home,
	};
</script>


<section class="hero is-success is-fullheight">
	<Navbar />
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
