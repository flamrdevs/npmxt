import { FetchError, ofetch } from 'ofetch';

import { safeParseBundleSize } from '~/bundlejs/schema';
import { BASE_URL_DENO } from '~/bundlejs/url';

describe('*name', () => {
	it.for([
		//
		['solid-js'],
		['@solidjs/start'],
	])('valid - %s', async ([pkg]) => {
		const fn = () => ofetch(`${BASE_URL_DENO}/?${new URLSearchParams({ q: pkg })}`);

		expect(fn).not.toThrow(FetchError);

		expect(safeParseBundleSize(await fn()).success).toBeTruthy();
	});
});
