export type User = {
	username: string;
	id: number;
	email: string;
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
