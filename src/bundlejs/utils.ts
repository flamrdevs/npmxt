import type { TPackageSchema } from '~/npm/schema';
import { createCacheStorage } from '~/utils/cache-storage';
import { StatusError } from '~/utils/error';

import { fetcherBundleSize } from './fetcher';
import { parseBundleSize, type TBundleSizeSchema } from './schema';

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
