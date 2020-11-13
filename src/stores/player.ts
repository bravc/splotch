import { writable } from 'svelte/store';
import { apiRequest, HttpVerb } from '../api/utils';
import { user } from '../store';

function createPlayer() {
	const { subscribe, set } = writable(null);

	return {
		subscribe,
		setPlayer: (player) => {
			let p = new player({
				name: 'Splotch Toolbox',
				getOAuthToken: async (cb) => {
					let res: { access_token: string } = await apiRequest(
						'http://localhost:8080/api/fresh',
						HttpVerb.GET,
						user.json().access_token
					);
					user.updateSpotToken(res.access_token);
					console.log(user.json().spotify_token);

					cb(res.access_token);
				},
			});
			p.connect();
			console.log(p);

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
export let player = createPlayer();
