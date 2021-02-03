export type User = {
	username: string;
	id: number;
	email: string;
	spotify_refresh: string;
	profile_url: string;
	spotify_id: string;
};

export type ResponseUser = {
	access_token: string;
	user: User;
};

export let responseToUser = (res: ResponseUser): User => {
	return { ...res.user, ...{ access_token: res.access_token } };
};

export type RecentTrack = {
	track: Track;
	played_at: string;
};

export type Track = {
	id: string;
	name: string;
	album: Album;
	artists: Artist[];
	duration_ms: number;
	uri: string;
	popularity: number;
};

export type Snippet = {
	id: string;
	name: string;
	user_id: number;
	timestamp_start: number;
	timestamp_end: number;
	duration_ms: number;
	track_uri: string;
};

export type Artist = {
	id: string;
	name: string;
	uri: string;
};

export type Album = {
	id: string;
	name: string;
	uri: string;
	images: { url: string }[];
};
