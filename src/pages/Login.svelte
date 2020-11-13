<script lang="ts">
	let username = '';
	let email = '';
	let password = '';
	let register = false;
	let loading = false;

	import { push } from 'svelte-spa-router';
	import { user } from '../store';
	import { responseToUser } from '../types';
	import type { ResponseUser, User } from '../types';
	import { apiRequest, HttpVerb } from '../api/utils';
	export let formSubmit = async () => {
		if (register) {
			loading = true;
			await apiRequest('http://localhost:8080/auth/register', HttpVerb.POST, false, {
				username: username,
				email: email,
				password: password,
			});

			let _user: ResponseUser = await apiRequest('http://localhost:8080/auth/token', HttpVerb.POST, false, {
				username: username,
				password: password,
			});

			loading = false;
			user.login(responseToUser(_user));
			push('/');
		} else {
			loading = true;
			let _user: ResponseUser = await apiRequest('http://localhost:8080/auth/token', HttpVerb.POST, false, {
				username: username,
				password: password,
			});

			loading = false;
			user.login(responseToUser(_user));
			push('/');
		}
	};
</script>

<div class="notification">
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
