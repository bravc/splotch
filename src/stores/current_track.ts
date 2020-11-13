import { writable } from 'svelte/store';

export let track = writable(null);
export let track_position = writable(0);