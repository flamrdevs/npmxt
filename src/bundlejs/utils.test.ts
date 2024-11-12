import { fetchPackage } from '~/npm/utils';

import { fetchBundleSize } from './utils';

describe('fetchBundleSize', () => {
	it.for([
		['solid-js', 'latest'],
		['solid-js', '1.0.0'],
		['solid-js', '2.0.0'],
		['@solidjs/start', 'latest'],
		['@solidjs/start', '1.0.0'],
		['@solidjs/start', '2.0.0'],
	])('found - %s@%s', async ([name, version]) => {
		await expect(fetchBundleSize(await fetchPackage(name, version))).resolves.toMatchObject({ size: expect.any(Object) });
	});
});
