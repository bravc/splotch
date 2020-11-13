// import { writable } from 'svelte/store';
// import { replace } from 'svelte-spa-router';
// import type { User } from './types';

// function createUser() {
// 	let maybe_user = localStorage.getItem('user');
// 	let user = maybe_user ? JSON.parse(maybe_user) : null;
// 	console.log(user);
// 	const { subscribe, set } = writable(user);

// 	return {
// 		subscribe,
// 		json: () => {
// 			return JSON.parse(localStorage.getItem('user') || '');
// 		},
// 		login: (user: User) => {
// 			console.log(user);
// 			localStorage.setItem('user', JSON.stringify(user));
// 			set(user);
// 		},
// 		updateSpotToken: (token: string) => {
// 			user.spotify_token = token;
// 			localStorage.setItem('user', JSON.stringify(user));

// 			set(user);
// 		},
// 		logout: () => {
// 			localStorage.removeItem('user');
// 			set(null);
// 			replace('/#/login');
// 		},
// 	};
// }

// export const user = createUser();
