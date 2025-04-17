import { FetchError, ofetch } from 'ofetch';

import { safeParsePackage, safeParsePackageMetadata } from '~/npm/schema';
import { BASE_URL_REGISTRY } from '~/npm/url';

describe('*name-with-version', () => {
	it.for([
		//
		['solid-js/latest'],
		['solid-js/1.0.0'],
		['@solidjs/start/latest'],
		['@solidjs/start/1.0.0'],
	])('valid - %s', async ([pkg]) => {
		const fn = () => ofetch(`${BASE_URL_REGISTRY}/${pkg}`);

		expect(fn).not.toThrow(FetchError);

		expect(safeParsePackage(await fn()).success).toBeTruthy();
	});
});

describe('*name', () => {
	it.for([
		//
		['solid-js'],
		['@solidjs/start'],
	])('valid - %s', async ([pkg]) => {
		const fn = () => ofetch(`${BASE_URL_REGISTRY}/${pkg}`);

		expect(fn).not.toThrow(FetchError);

		expect(safeParsePackageMetadata(await fn()).success).toBeTruthy();
	});
});
