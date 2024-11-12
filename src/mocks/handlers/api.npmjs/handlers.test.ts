import { FetchError, ofetch } from 'ofetch';

import { PACKAGE_DOWNLOADS_LAST_LIST, parsePackageDownloadsPoint, parsePackageDownloadsRange } from '~/npm/schema';
import { BASE_URL_API } from '~/npm/url';

describe('downloads/:type/last', () => {
	const definedPackages = [
		//
		'solid-js',
		'@solidjs/start',
	];

	it.for([
		...definedPackages.reduce((arr, name) => arr.concat(PACKAGE_DOWNLOADS_LAST_LIST.map((last) => ['point', last, name])), [] as string[][]),
		...definedPackages.reduce((arr, name) => arr.concat(PACKAGE_DOWNLOADS_LAST_LIST.map((last) => ['range', last, name])), [] as string[][]),
	])('valid - $s/$s : %s', async ([type, last, name]) => {
		const fn = () => ofetch(`${BASE_URL_API}/downloads/${type}/last-${last}/${name}`);

		expect(fn).not.toThrow(FetchError);

		if (type === 'point') expect(parsePackageDownloadsPoint.safe(await fn()).success).toBeTruthy();
		if (type === 'range') expect(parsePackageDownloadsRange.safe(await fn()).success).toBeTruthy();
	});
});
