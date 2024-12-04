import type { TPackageSchema } from '~/npm/schema';

import { createCacheStorage } from '~/utils/cache-storage';
import { StatusError } from '~/utils/error';

import { type TBundleSizeSchema, parseBundleSize } from './schema';

import { fetcherBundleSize } from './fetcher';

export const fetchBundleSize = (() => {
	const withCacheStorage = createCacheStorage<TBundleSizeSchema>(__DEV__ ? 'bundle-size' : 'bz');

	return (pkg: TPackageSchema): Promise<TBundleSizeSchema> =>
		withCacheStorage(`${pkg.name}@${pkg.version}`, async () => {
			try {
				return parseBundleSize(await fetcherBundleSize(pkg));
			} catch (error) {
				if (__DEV__) console.error(error);
				throw new StatusError('Package not found', 404);
			}
		});
})();
