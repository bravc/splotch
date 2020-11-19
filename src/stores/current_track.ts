import { writable } from 'svelte/store';

export let track = writable(null);
export let track_start_position = writable(0);
export let track_end_position = writable(null);
export let track_position = writable(0);
