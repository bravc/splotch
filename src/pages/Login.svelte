<script lang="ts">
	import { push } from 'svelte-spa-router';
	import { fade } from 'svelte/transition';

	import { user, access_token } from '../stores/user';
	import { responseToUser } from '../types';
	import type { ResponseUser, User } from '../types';
	import { spot_scopes } from '../constants';
	import { apiRequest, HttpVerb } from '../api/utils';

	let username = '';
	let email = '';
	let password = '';
	let register = false;
	let loading = false;
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const apiUrl = __myapp.env.API_URL;
	const client_id = __myapp.env.CLIENT_ID;
	const query_string = (user_id: number) =>
		new URLSearchParams({
			client_id: client_id,
			response_type: 'code',
			state: user_id.toString(),
			redirect_uri: `${apiUrl}/auth/spotify/callback`,
			scope: spot_scopes,
		}).toString();

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
			}, true);

			loading = false;
			user.login(responseToUser(_user));
			access_token.setAuth(_user.access_token);
			window.location.href = `https://accounts.spotify.com/authorize?${query_string(_user.user.id)}`;
		} else {
			loading = true;
			let _user: ResponseUser = await apiRequest(`${apiUrl}/auth/token`, HttpVerb.POST, false, {
				username: username,
				password: password,
			}, true);

			loading = false;
			console.log(_user);
			user.login(responseToUser(_user));
			access_token.setAuth(_user.access_token);

			if (!_user.user.spotify_refresh) {
				window.location.href = `https://accounts.spotify.com/authorize?${query_string(_user.user.id)}`;
			} else {
				push('/');
			}
		}
	};

	$: validUsername = !register || username.length > 6;
	$: validPassword = !register || password.length > 6;
	$: validEmail = !register || re.test(email);
	$: submitDisabled = register ? !validEmail || !validPassword || !validPassword : false;
</script>

<style>
</style>

<div class="container">
	<div class="notification">
		<div class="field">
			<label for="" class="label">Username</label>
			<div class="control has-icons-left has-icons-right">
				<input class="input" type="text" placeholder="Username" bind:value={username} />
				<span class="icon is-small is-left"> <i class="fas fa-user" /> </span>
				<!-- <span class="icon is-small is-right"> <i class="fas fa-check" /> </span> -->
			</div>
			{#if !validUsername}
				<p class="help is-danger">Username must be greater than 6 characters.</p>
			{/if}
		</div>
		<div class="field">
			<label for="" class="label">Password</label>
			<div class="control has-icons-left has-icons-right">
				<input class="input" type="password" placeholder="Password" bind:value={password} />
				<span class="icon is-small is-left"> <i class="fas fa-user" /> </span>
			</div>
			{#if !validPassword}
				<p class="help is-danger">Password must be greater than 6 characters.</p>
			{/if}
		</div>

		{#if register}
			<div transition:fade="{{ duration: 500 }}" class="field">
				<label for="" class="label">Email</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input" type="email" placeholder="Email" bind:value={email} />
					<span class="icon is-small is-left"> <i class="fas fa-envelope" /> </span>
					<!-- <span class="icon is-small is-right"> <i class="fas fa-exclamation-triangle" /> </span> -->
				</div>
				{#if !validEmail}
					<p class="help is-danger">Invalid Email</p>
				{/if}
			</div>
		{/if}
		<br />
		{#if loading}<progress class="progress is-small is-primary" max="100">15%</progress>{/if}
		<div class="field is-grouped">
			<div class="control">
				<button disabled={submitDisabled} on:click={formSubmit} class="button is-link">Submit</button>
			</div>
			<div class="control">
				<button
					on:click={() => (register = !register)}
					class="button is-link is-warning">{register ? 'Sign In' : 'Register'}</button>
			</div>
		</div>
	</div>
</div>
