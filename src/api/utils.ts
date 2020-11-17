import { error, errorMessage } from '../stores/errors';

export enum HttpVerb {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
}

export let apiRequest = async <T>(
	url: string,
	method: HttpVerb,
	auth?: string,
	body?: object,
	returnJson: boolean = true
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
	try {
		let res = await fetch(url, {
			method: method,
			mode: 'cors',
			headers: new Headers(headers),
			body: body ? JSON.stringify(body) : null,
		});
		console.log(`Response from ${url}`);
		console.log(res);
		if (res.ok && returnJson) {
			let json: T = await res.json();
			return json;
		} else if (!res.ok) {
			error.set(true);
		}
	} catch (e) {
		error.set(true);
		errorMessage.set(e.message)
	}
};
