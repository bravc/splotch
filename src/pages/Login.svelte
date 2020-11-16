<script lang="ts">
	import { push } from 'svelte-spa-router';
	import { user, access_token } from '../stores/user';
	import { responseToUser } from '../types';
	import type { ResponseUser, User } from '../types';
	import { apiRequest, HttpVerb } from '../api/utils';

	let username = '';
	let email = '';
	let password = '';
	let register = false;
	let loading = false;
	const apiUrl = __myapp.env.API_URL;

	export let formSubmit = async () => {
		if (register) {
			loading = true;
			await apiRequest(`${apiUrl}/auth/register`, HttpVerb.POST, false, {
				username: username,
				email: email,
				password: password,
			});

			let _user: ResponseUser = await apiRequest(`${apiUrl}/auth/token`, HttpVerb.POST, false, {
				username: username,
				password: password,
			});

			loading = false;
			user.login(responseToUser(_user));
			access_token.setAuth(_user.access_token);

			push('/');
		} else {
			loading = true;
			let _user: ResponseUser = await apiRequest(`${apiUrl}/auth/token`, HttpVerb.POST, false, {
				username: username,
				password: password,
			});

			loading = false;
			console.log(_user);
			user.login(responseToUser(_user));
			access_token.setAuth(_user.access_token);
			push('/');
		}
	};
</script>

<style>
	/* .notification {
		max-width: 60vh;
	} */
</style>

<div class="columns">
	<div class="notification column is-half is-offset-one-quarter">
		<div class="field">
			<label for="" class="label">Username</label>
			<div class="control has-icons-left has-icons-right">
				<input class="input" type="text" placeholder="Username" bind:value={username} />
				<span class="icon is-small is-left"> <i class="fas fa-user" /> </span>
				<!-- <span class="icon is-small is-right"> <i class="fas fa-check" /> </span> -->
			</div>
			<!-- <p class="help is-success">This username is available</p> -->
		</div>
		<div class="field">
			<label for="" class="label">Password</label>
			<div class="control has-icons-left has-icons-right">
				<input class="input" type="password" placeholder="Password" bind:value={password} />
				<span class="icon is-small is-left"> <i class="fas fa-user" /> </span>
				<!-- <span class="icon is-small is-right"> <i class="fas fa-check" /> </span> -->
			</div>
			<!-- <p class="help is-success">This username is available</p> -->
		</div>

		{#if register}
			<div class="field">
				<label for="" class="label">Email</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input" type="email" placeholder="Email" bind:value={email} />
					<span class="icon is-small is-left"> <i class="fas fa-envelope" /> </span>
					<!-- <span class="icon is-small is-right"> <i class="fas fa-exclamation-triangle" /> </span> -->
				</div>
				<!-- <p class="help is-danger">This email is invalid</p> -->
			</div>
		{/if}
		<br />
		{#if loading}<progress class="progress is-small is-primary" max="100">15%</progress>{/if}
		<div class="field is-grouped">
			<div class="control"><button on:click={formSubmit} class="button is-link">Submit</button></div>
			<div class="control">
				<button
					on:click={() => (register = !register)}
					class="button is-link is-warning">{register ? 'Sign In' : 'Register'}</button>
			</div>
		</div>
	</div>
</div>
