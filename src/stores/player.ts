import { writable, get } from 'svelte/store';
import { apiRequest, HttpVerb } from '../api/utils';
import { access_token, spotify_token } from '../stores/user';
import { track_position, track } from '../stores/current_track';
const apiUrl = __myapp.env.API_URL;

function createPlayer() {
	const { subscribe, set } = writable(null);

	return {
		subscribe,
		setPlayer: (player) => {
			let p = new player({
				name: 'Splotch Toolbox',
				getOAuthToken: async (cb) => {
					console.log('Trying to get fresh token');
					

					let res: { access_token: string } = await apiRequest(
						`${apiUrl}/api/fresh`,
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
			p.addListener(
				'player_state_changed',
				({ position, paused, duration, track_window: { current_track, next_tracks } }) => {
					if (get(track) && get(track).name != current_track.name) {
						track_position.set(0);
					}
					if (position != get(track_position)) {
						track_position.set(position);
					}
					track.set(current_track);
					console.log(next_tracks);

					playing.set(!paused);
				}
			);

			p.addListener('ready', async (ready) => {
				device_id.set(ready.device_id);
				console.log('Ready with Device ID', device_id);
				let context = localStorage.getItem('playback_context');
				if (context) {
					let res = await fetch(`${apiUrl}/api/recent`, {
						method: 'GET',
						mode: 'cors',
						headers: new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${get(access_token)}` }),
					});
					let json = await res.json();

					track.set(json.items[0].track);
				}
			});

			p.addListener('player_state_changed', ({ context, position, duration, track_window: { current_track } }) => {
				console.log(context);
				localStorage.setItem('playback_context', context.uri);
				console.log('Currently Playing', current_track);
				console.log('Position in Song', position);
				console.log('Duration of Song', duration);
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
export let test_tracks = {
	items: [
		{
			id: '5peXF38os4UT1lsfdoKMt5',
			name: 'g2g ttyl (feat. THEY.)',
			album: {
				id: '1nXBX3wP3DQgwpqvVtJl8H',
				name: 'cybersex',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273161be192a33e0c3c3bb6a307',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e02161be192a33e0c3c3bb6a307',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00004851161be192a33e0c3c3bb6a307',
					},
				],
				uri: 'spotify:album:1nXBX3wP3DQgwpqvVtJl8H',
			},
			artists: [
				{
					id: '2cFrymmkijnjDg9SS92EPM',
					name: 'blackbear',
					uri: 'spotify:artist:2cFrymmkijnjDg9SS92EPM',
				},
				{
					id: '0pghUohLPptZWBasy2wmUx',
					name: 'THEY.',
					uri: 'spotify:artist:0pghUohLPptZWBasy2wmUx',
				},
			],
			duration_ms: 181771,
			uri: 'spotify:track:5peXF38os4UT1lsfdoKMt5',
			popularity: 55,
		},
		{
			id: '7HytU9V8vMCUayply0lYBq',
			name: 'Champagne and Pools (feat. Blackbear & Kyle)',
			album: {
				id: '79BJk3m9oRh03Cybtc0hxq',
				name: 'Happy Camper',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2736bfcfd587676118df9b710a1',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e026bfcfd587676118df9b710a1',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d000048516bfcfd587676118df9b710a1',
					},
				],
				uri: 'spotify:album:79BJk3m9oRh03Cybtc0hxq',
			},
			artists: [
				{
					id: '382aq8Pij5V2nE2JMHMoxl',
					name: 'Hoodie Allen',
					uri: 'spotify:artist:382aq8Pij5V2nE2JMHMoxl',
				},
				{
					id: '2cFrymmkijnjDg9SS92EPM',
					name: 'blackbear',
					uri: 'spotify:artist:2cFrymmkijnjDg9SS92EPM',
				},
				{
					id: '6gyKRQqExSKKBBuScJ0pwx',
					name: 'Kyle',
					uri: 'spotify:artist:6gyKRQqExSKKBBuScJ0pwx',
				},
			],
			duration_ms: 214413,
			uri: 'spotify:track:7HytU9V8vMCUayply0lYBq',
			popularity: 63,
		},
		{
			id: '67xBtV07CC73eFw7z5oCvU',
			name: 'Do You Remember',
			album: {
				id: '7bgi7zCoDsZdlLKPonHZqP',
				name: 'The Big Day',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273a2a8b029b103df0e90724ad5',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e02a2a8b029b103df0e90724ad5',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00004851a2a8b029b103df0e90724ad5',
					},
				],
				uri: 'spotify:album:7bgi7zCoDsZdlLKPonHZqP',
			},
			artists: [
				{
					id: '1anyVhU62p31KFi8MEzkbf',
					name: 'Chance the Rapper',
					uri: 'spotify:artist:1anyVhU62p31KFi8MEzkbf',
				},
				{
					id: '0YrtvWJMgSdVrk3SfNjTbx',
					name: 'Death Cab for Cutie',
					uri: 'spotify:artist:0YrtvWJMgSdVrk3SfNjTbx',
				},
			],
			duration_ms: 236685,
			uri: 'spotify:track:67xBtV07CC73eFw7z5oCvU',
			popularity: 59,
		},
		{
			id: '0OaunKfsxkgBvPv68jBbmm',
			name: "It Wasn't Me",
			album: {
				id: '04bMI1jl7CB82LkdeHXyEo',
				name: 'The Boombastic Collection - Best of Shaggy',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273863098b4108636d18d8e52e0',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e02863098b4108636d18d8e52e0',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00004851863098b4108636d18d8e52e0',
					},
				],
				uri: 'spotify:album:04bMI1jl7CB82LkdeHXyEo',
			},
			artists: [
				{
					id: '5EvFsr3kj42KNv97ZEnqij',
					name: 'Shaggy',
					uri: 'spotify:artist:5EvFsr3kj42KNv97ZEnqij',
				},
				{
					id: '67wCYxOq4A1ohAs7jWYaOJ',
					name: 'Rik Rok',
					uri: 'spotify:artist:67wCYxOq4A1ohAs7jWYaOJ',
				},
			],
			duration_ms: 227546,
			uri: 'spotify:track:0OaunKfsxkgBvPv68jBbmm',
			popularity: 66,
		},
		{
			id: '2rmq49FcJ4U3wh1Z7C9UxE',
			name: 'IV. Sweatpants',
			album: {
				id: '0zi2TaQkYxfXIBvl2yTjQJ',
				name: 'Because The Internet',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b27354ce59f0a3c40d1942f6e86a',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e0254ce59f0a3c40d1942f6e86a',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000485154ce59f0a3c40d1942f6e86a',
					},
				],
				uri: 'spotify:album:0zi2TaQkYxfXIBvl2yTjQJ',
			},
			artists: [
				{
					id: '73sIBHcqh3Z3NyqHKZ7FOL',
					name: 'Childish Gambino',
					uri: 'spotify:artist:73sIBHcqh3Z3NyqHKZ7FOL',
				},
			],
			duration_ms: 180680,
			uri: 'spotify:track:2rmq49FcJ4U3wh1Z7C9UxE',
			popularity: 0,
		},
		{
			id: '4HnPZXkx15Y5hfBWh9vtQL',
			name: 'Lady Killers (feat. Hoodie Allen)',
			album: {
				id: '1wRnE3zgCE5oY28pzmlsqe',
				name: 'Must Be Nice',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2737181af52d89063ff89acf3e0',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e027181af52d89063ff89acf3e0',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d000048517181af52d89063ff89acf3e0',
					},
				],
				uri: 'spotify:album:1wRnE3zgCE5oY28pzmlsqe',
			},
			artists: [
				{
					id: '02kJSzxNuaWGqwubyUba0Z',
					name: 'G-Eazy',
					uri: 'spotify:artist:02kJSzxNuaWGqwubyUba0Z',
				},
				{
					id: '382aq8Pij5V2nE2JMHMoxl',
					name: 'Hoodie Allen',
					uri: 'spotify:artist:382aq8Pij5V2nE2JMHMoxl',
				},
			],
			duration_ms: 249400,
			uri: 'spotify:track:4HnPZXkx15Y5hfBWh9vtQL',
			popularity: 58,
		},
		{
			id: '5GUYJTQap5F3RDQiCOJhrS',
			name: 'Self Control',
			album: {
				id: '3mH6qwIy9crq0I9YQbOuDf',
				name: 'Blonde',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e02c5649add07ed3720be9d5526',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526',
					},
				],
				uri: 'spotify:album:3mH6qwIy9crq0I9YQbOuDf',
			},
			artists: [
				{
					id: '2h93pZq0e7k5yf4dywlkpM',
					name: 'Frank Ocean',
					uri: 'spotify:artist:2h93pZq0e7k5yf4dywlkpM',
				},
			],
			duration_ms: 249667,
			uri: 'spotify:track:5GUYJTQap5F3RDQiCOJhrS',
			popularity: 74,
		},
		{
			id: '0v9Wz8o0BT8DU38R4ddjeH',
			name: 'No Problem (feat. Lil Wayne & 2 Chainz)',
			album: {
				id: '71QyofYesSsRMwFOTafnhB',
				name: 'Coloring Book',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273e71dd15fc5bdefd5bff70452',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e02e71dd15fc5bdefd5bff70452',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00004851e71dd15fc5bdefd5bff70452',
					},
				],
				uri: 'spotify:album:71QyofYesSsRMwFOTafnhB',
			},
			artists: [
				{
					id: '1anyVhU62p31KFi8MEzkbf',
					name: 'Chance the Rapper',
					uri: 'spotify:artist:1anyVhU62p31KFi8MEzkbf',
				},
				{
					id: '55Aa2cqylxrFIXC767Z865',
					name: 'Lil Wayne',
					uri: 'spotify:artist:55Aa2cqylxrFIXC767Z865',
				},
				{
					id: '17lzZA2AlOHwCwFALHttmp',
					name: '2 Chainz',
					uri: 'spotify:artist:17lzZA2AlOHwCwFALHttmp',
				},
			],
			duration_ms: 304606,
			uri: 'spotify:track:0v9Wz8o0BT8DU38R4ddjeH',
			popularity: 71,
		},
		{
			id: '4oFtLSgHyZPNYDCcANhTnO',
			name: 'Institutionalized',
			album: {
				id: '7ycBtnsMtyVbbwTfJwRjSP',
				name: 'To Pimp A Butterfly',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e02cdb645498cd3d8a2db4d05e1',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00004851cdb645498cd3d8a2db4d05e1',
					},
				],
				uri: 'spotify:album:7ycBtnsMtyVbbwTfJwRjSP',
			},
			artists: [
				{
					id: '2YZyLoL8N0Wb9xBt1NhZWg',
					name: 'Kendrick Lamar',
					uri: 'spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg',
				},
				{
					id: '4jCbgl5Dmt3uOh8WRQfpPs',
					name: 'Bilal',
					uri: 'spotify:artist:4jCbgl5Dmt3uOh8WRQfpPs',
				},
				{
					id: '0N41KJ4H6bkPAm2tx7VS8C',
					name: 'Anna Wise',
					uri: 'spotify:artist:0N41KJ4H6bkPAm2tx7VS8C',
				},
				{
					id: '7hJcb9fa4alzcOq3EaNPoG',
					name: 'Snoop Dogg',
					uri: 'spotify:artist:7hJcb9fa4alzcOq3EaNPoG',
				},
			],
			duration_ms: 271773,
			uri: 'spotify:track:4oFtLSgHyZPNYDCcANhTnO',
			popularity: 60,
		},
		{
			id: '078C2jXg7XsMgW78Gfx1JA',
			name: 'SMUCKERS (feat. Lil Wayne & Kanye West)',
			album: {
				id: '621OhgnZJ7Pz8iUazct1In',
				name: 'Cherry Bomb',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2730f2e9f092b4e9c4424afb446',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e020f2e9f092b4e9c4424afb446',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d000048510f2e9f092b4e9c4424afb446',
					},
				],
				uri: 'spotify:album:621OhgnZJ7Pz8iUazct1In',
			},
			artists: [
				{
					id: '4V8LLVI7PbaPR0K2TGSxFF',
					name: 'Tyler, The Creator',
					uri: 'spotify:artist:4V8LLVI7PbaPR0K2TGSxFF',
				},
				{
					id: '55Aa2cqylxrFIXC767Z865',
					name: 'Lil Wayne',
					uri: 'spotify:artist:55Aa2cqylxrFIXC767Z865',
				},
				{
					id: '5K4W6rqBFWDnAN6FQUkS6x',
					name: 'Kanye West',
					uri: 'spotify:artist:5K4W6rqBFWDnAN6FQUkS6x',
				},
			],
			duration_ms: 334363,
			uri: 'spotify:track:078C2jXg7XsMgW78Gfx1JA',
			popularity: 63,
		},
		{
			id: '11QvWp3CsEPd0YLE6xKGyx',
			name: 'My Boy (feat. J. Cole) - Freestyle',
			album: {
				id: '2KWMRiVC16dYpH9VkERMOF',
				name: 'Free Lunch',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2738ad000f07b48967c0f065b2e',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e028ad000f07b48967c0f065b2e',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d000048518ad000f07b48967c0f065b2e',
					},
				],
				uri: 'spotify:album:2KWMRiVC16dYpH9VkERMOF',
			},
			artists: [
				{
					id: '67nwj3Y5sZQLl72VNUHEYE',
					name: 'Wale',
					uri: 'spotify:artist:67nwj3Y5sZQLl72VNUHEYE',
				},
				{
					id: '6l3HvQ5sa6mXTsMTB19rO5',
					name: 'J. Cole',
					uri: 'spotify:artist:6l3HvQ5sa6mXTsMTB19rO5',
				},
			],
			duration_ms: 269657,
			uri: 'spotify:track:11QvWp3CsEPd0YLE6xKGyx',
			popularity: 55,
		},
		{
			id: '5z1cveQ7uNn5BF9e0oDQNq',
			name: 'Valley Girls',
			album: {
				id: '0rB352gGtPwLhv3QJwhWD2',
				name: 'The Afterglow',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b27338e3de5646d43659bacdb473',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e0238e3de5646d43659bacdb473',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000485138e3de5646d43659bacdb473',
					},
				],
				uri: 'spotify:album:0rB352gGtPwLhv3QJwhWD2',
			},
			artists: [
				{
					id: '2cFrymmkijnjDg9SS92EPM',
					name: 'blackbear',
					uri: 'spotify:artist:2cFrymmkijnjDg9SS92EPM',
				},
			],
			duration_ms: 215824,
			uri: 'spotify:track:5z1cveQ7uNn5BF9e0oDQNq',
			popularity: 0,
		},
		{
			id: '7Ks4VCY1wFebnOdJrM13t6',
			name: "Wesley's Theory",
			album: {
				id: '7ycBtnsMtyVbbwTfJwRjSP',
				name: 'To Pimp A Butterfly',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e02cdb645498cd3d8a2db4d05e1',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00004851cdb645498cd3d8a2db4d05e1',
					},
				],
				uri: 'spotify:album:7ycBtnsMtyVbbwTfJwRjSP',
			},
			artists: [
				{
					id: '2YZyLoL8N0Wb9xBt1NhZWg',
					name: 'Kendrick Lamar',
					uri: 'spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg',
				},
				{
					id: '2GVBp7QyHckoOg7rYkLvrA',
					name: 'George Clinton',
					uri: 'spotify:artist:2GVBp7QyHckoOg7rYkLvrA',
				},
				{
					id: '4frXpPxQQZwbCu3eTGnZEw',
					name: 'Thundercat',
					uri: 'spotify:artist:4frXpPxQQZwbCu3eTGnZEw',
				},
			],
			duration_ms: 287360,
			uri: 'spotify:track:7Ks4VCY1wFebnOdJrM13t6',
			popularity: 63,
		},
		{
			id: '4dASQiO1Eoo3RJvt74FtXB',
			name: 'Sucker for Pain (with Wiz Khalifa, Imagine Dragons, Logic & Ty Dolla $ign feat. X Ambassadors)',
			album: {
				id: '704GHNtZhEe9TBgleCNNGv',
				name: 'Sucker for Pain (with Logic & Ty Dolla $ign feat. X Ambassadors)',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2737d8dfcfd507069d7f2062caf',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e027d8dfcfd507069d7f2062caf',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d000048517d8dfcfd507069d7f2062caf',
					},
				],
				uri: 'spotify:album:704GHNtZhEe9TBgleCNNGv',
			},
			artists: [
				{
					id: '55Aa2cqylxrFIXC767Z865',
					name: 'Lil Wayne',
					uri: 'spotify:artist:55Aa2cqylxrFIXC767Z865',
				},
				{
					id: '137W8MRPWKqSmrBGDBFSop',
					name: 'Wiz Khalifa',
					uri: 'spotify:artist:137W8MRPWKqSmrBGDBFSop',
				},
				{
					id: '53XhwfbYqKCa1cC15pYq2q',
					name: 'Imagine Dragons',
					uri: 'spotify:artist:53XhwfbYqKCa1cC15pYq2q',
				},
				{
					id: '3NPpFNZtSTHheNBaWC82rB',
					name: 'X Ambassadors',
					uri: 'spotify:artist:3NPpFNZtSTHheNBaWC82rB',
				},
				{
					id: '4xRYI6VqpkE3UwrDrAZL8L',
					name: 'Logic',
					uri: 'spotify:artist:4xRYI6VqpkE3UwrDrAZL8L',
				},
				{
					id: '7c0XG5cIJTrrAgEC3ULPiq',
					name: 'Ty Dolla $ign',
					uri: 'spotify:artist:7c0XG5cIJTrrAgEC3ULPiq',
				},
			],
			duration_ms: 243490,
			uri: 'spotify:track:4dASQiO1Eoo3RJvt74FtXB',
			popularity: 77,
		},
		{
			id: '4wFHz9UQtuXUgbhy7cn8qk',
			name: 'Wicked',
			album: {
				id: '5WS1g0cKtjfK6eDoSLdv7d',
				name: 'Mansionz',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b27390d0e1eb630b1595d23a1a0e',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e0290d0e1eb630b1595d23a1a0e',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000485190d0e1eb630b1595d23a1a0e',
					},
				],
				uri: 'spotify:album:5WS1g0cKtjfK6eDoSLdv7d',
			},
			artists: [
				{
					id: '2o8lOQRjzsSC8UdbNN88HN',
					name: 'mansionz',
					uri: 'spotify:artist:2o8lOQRjzsSC8UdbNN88HN',
				},
				{
					id: '02kJSzxNuaWGqwubyUba0Z',
					name: 'G-Eazy',
					uri: 'spotify:artist:02kJSzxNuaWGqwubyUba0Z',
				},
			],
			duration_ms: 215513,
			uri: 'spotify:track:4wFHz9UQtuXUgbhy7cn8qk',
			popularity: 55,
		},
		{
			id: '5ykbOijJEfRhuo2Td1m0Qd',
			name: '7',
			album: {
				id: '07IHAhsG4FnnfHQSb3bbAZ',
				name: 'The Ride',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b27374558885d860bb58d78d1de8',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e0274558885d860bb58d78d1de8',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000485174558885d860bb58d78d1de8',
					},
				],
				uri: 'spotify:album:07IHAhsG4FnnfHQSb3bbAZ',
			},
			artists: [
				{
					id: '2xaAOVImG2O6lURwqperlD',
					name: 'Catfish and the Bottlemen',
					uri: 'spotify:artist:2xaAOVImG2O6lURwqperlD',
				},
			],
			duration_ms: 256306,
			uri: 'spotify:track:5ykbOijJEfRhuo2Td1m0Qd',
			popularity: 67,
		},
		{
			id: '1CAijerspiGnyZHAVsGNL1',
			name: 'Rich White Girls',
			album: {
				id: '5WS1g0cKtjfK6eDoSLdv7d',
				name: 'Mansionz',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b27390d0e1eb630b1595d23a1a0e',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e0290d0e1eb630b1595d23a1a0e',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000485190d0e1eb630b1595d23a1a0e',
					},
				],
				uri: 'spotify:album:5WS1g0cKtjfK6eDoSLdv7d',
			},
			artists: [
				{
					id: '2o8lOQRjzsSC8UdbNN88HN',
					name: 'mansionz',
					uri: 'spotify:artist:2o8lOQRjzsSC8UdbNN88HN',
				},
			],
			duration_ms: 209563,
			uri: 'spotify:track:1CAijerspiGnyZHAVsGNL1',
			popularity: 59,
		},
		{
			id: '5UiT4e4DHwZrcVIXojU5um',
			name: 'Surprise Party (feat. Blackbear)',
			album: {
				id: '79BJk3m9oRh03Cybtc0hxq',
				name: 'Happy Camper',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2736bfcfd587676118df9b710a1',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e026bfcfd587676118df9b710a1',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d000048516bfcfd587676118df9b710a1',
					},
				],
				uri: 'spotify:album:79BJk3m9oRh03Cybtc0hxq',
			},
			artists: [
				{
					id: '382aq8Pij5V2nE2JMHMoxl',
					name: 'Hoodie Allen',
					uri: 'spotify:artist:382aq8Pij5V2nE2JMHMoxl',
				},
				{
					id: '2cFrymmkijnjDg9SS92EPM',
					name: 'blackbear',
					uri: 'spotify:artist:2cFrymmkijnjDg9SS92EPM',
				},
			],
			duration_ms: 188039,
			uri: 'spotify:track:5UiT4e4DHwZrcVIXojU5um',
			popularity: 66,
		},
		{
			id: '4h90qkbnW1Qq6pBhoPvwko',
			name: 'Sidewalks',
			album: {
				id: '2ODvWsOgouMbaA5xf0RkJe',
				name: 'Starboy',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e024718e2b124f79258be7bc452',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d000048514718e2b124f79258be7bc452',
					},
				],
				uri: 'spotify:album:2ODvWsOgouMbaA5xf0RkJe',
			},
			artists: [
				{
					id: '1Xyo4u8uXC1ZmMpatF05PJ',
					name: 'The Weeknd',
					uri: 'spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ',
				},
				{
					id: '2YZyLoL8N0Wb9xBt1NhZWg',
					name: 'Kendrick Lamar',
					uri: 'spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg',
				},
			],
			duration_ms: 231360,
			uri: 'spotify:track:4h90qkbnW1Qq6pBhoPvwko',
			popularity: 70,
		},
		{
			id: '2gZUPNdnz5Y45eiGxpHGSc',
			name: 'POWER',
			album: {
				id: '20r762YmB5HeofjMCiPMLv',
				name: 'My Beautiful Dark Twisted Fantasy',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d00004851d9194aa18fa4c9362b47464f',
					},
				],
				uri: 'spotify:album:20r762YmB5HeofjMCiPMLv',
			},
			artists: [
				{
					id: '5K4W6rqBFWDnAN6FQUkS6x',
					name: 'Kanye West',
					uri: 'spotify:artist:5K4W6rqBFWDnAN6FQUkS6x',
				},
			],
			duration_ms: 292093,
			uri: 'spotify:track:2gZUPNdnz5Y45eiGxpHGSc',
			popularity: 78,
		},
	],
};