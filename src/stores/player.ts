import { writable, get } from 'svelte/store';
import { apiRequest, HttpVerb } from '../api/utils';
import { access_token, spotify_token } from '../stores/user';
import { track_position, track } from '../stores/current_track';

function createPlayer() {
	const { subscribe, set } = writable(null);

	return {
		subscribe,
		setPlayer: (player) => {
			let p = new player({
				name: 'Splotch Toolbox',
				getOAuthToken: async (cb) => {
					console.log('Trying to get fresh token');
					console.log(get(access_token));

					let res: { access_token: string } = await apiRequest(
						'http://localhost:8080/api/fresh',
						HttpVerb.GET,
						get(access_token)
					);
					console.log(res);
					spotify_token.setAuth(res.access_token);
					console.log(spotify_token);

					cb(res.access_token);
				},
			});
			p.connect();
			p.addListener('player_state_changed', ({ position, paused, duration, track_window: { current_track } }) => {
				if (get(track) && get(track).name != current_track.name) {
					track_position.set(0)
				}
				track.set(current_track);

				playing.set(!paused);
			});

			p.addListener('ready', (ready) => {
				device_id.set(ready.device_id);
				console.log('Ready with Device ID', device_id);
			});

			set(p);
		},
	};
}

export let waitForSpot = async () => {
	return new Promise((resolve) => {
		if (window.Spotify) {
			resolve(window.Spotify);
		} else {
			window.onSpotifyWebPlaybackSDKReady = () => {
				resolve(window.Spotify);
			};
		}
	});
};

export let device_id = writable(null);
export let playing = writable(false);
export let seeking = writable(false);
export let player = createPlayer();
