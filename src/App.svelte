<script lang="ts">
	import Router from 'svelte-spa-router';
	import Navbar from './components/Navbar.svelte';
	import About from './pages/About.svelte';
	import Login from './pages/Login.svelte';
	import Home from './pages/Home.svelte';
	import { error, errorMessage } from './stores/errors';

	const routes = {
		'/about': About,
		'/login': Login,
		'/': Home,
	};
</script>

<section class="hero is-success is-fullheight">
	<Navbar />
	{#if $error}
		<div class="container is-fluid has-text-centered">
			<div class="notification is-danger">
				<h1 class="title">An error occured.</h1>
				<h2 class="subtitle">{$errorMessage ? $errorMessage : 'Unknown error.'}</h2>
			</div>
		</div>
	{/if}
	<Router {routes} />
	<footer class="hero-foot">
		<div class="content has-text-centered">
			<p>
				<strong class="has-text-light">Splotch</strong>
				by
				<a href="https://github.com/bravc">Cameron Braverman</a>. The source code is licensed
			</p>
		</div>
	</footer>
</section>
