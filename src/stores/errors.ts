import { writable } from 'svelte/store';

export let error = writable(false);
export let errorMessage = writable(null);
