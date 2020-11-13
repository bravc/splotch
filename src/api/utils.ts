import { user } from '../store';

export enum HttpVerb {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
}

export let apiRequest = async <T>(
	url: string,
	method: HttpVerb,
	auth?: object,
	body?: object,
	returnJson?: boolean
): Promise<T> => {
	let headers = { 'Content-Type': 'application/json' };
	headers = auth
		? {
				...headers,
				...{
					Authorization: `Bearer ${auth}`,
				},
		  }
		: headers;

	let res = await fetch(url, {
		method: method,
		mode: 'cors',
		headers: new Headers(headers),
		body: body ? JSON.stringify(body) : null,
	});
	if (res.ok) {
		let json: T = await res.json();
		return json;
	} else {
		return null;
	}
};
