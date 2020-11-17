import { writable } from 'svelte/store';
import { replace } from 'svelte-spa-router';
import type { User } from '../types';

function createUser() {
	let maybe_user = localStorage.getItem('user');
	let user = maybe_user ? JSON.parse(maybe_user) : null;
	console.log(user);
	const { subscribe, set } = writable(user);

	return {
		subscribe,
		json: () => {
			return JSON.parse(localStorage.getItem('user') || '');
		},
		login: (user: User) => {
			console.log(user);
			localStorage.setItem('user', JSON.stringify(user));
			set(user);
		},
		logout: () => {
			localStorage.removeItem('user');
			spotify_token.logout();
			access_token.logout();
			set(null);
			replace('/login');
		},
	};
}

export let createSpotToken = () => {
	let maybe_auth = localStorage.getItem('spot_auth');
	const { subscribe, set } = writable(maybe_auth);

	return {
		subscribe,
		logout: () => {
			localStorage.removeItem('spot_auth');
			set(null);
		},
		setAuth: (token: string) => {
			localStorage.setItem('spot_auth', token);
			set(token);
		},
	};
};

export let createAuthToken = () => {
	let maybe_auth = localStorage.getItem('splotch_auth');
	const { subscribe, set } = writable(maybe_auth);

	return {
		subscribe,
		logout: () => {
			localStorage.removeItem('splotch_auth');
			set(null);
		},
		setAuth: (token: string) => {
			localStorage.setItem('splotch_auth', token);
			set(token);
		},
	};
};

export const user = createUser();
export const spotify_token = createSpotToken();
export const access_token = createAuthToken();
