import { json } from '@solidjs/router';

import { parseCachedPackageName } from '~/npm/schema';
import { fetchPackage, splitPackageNameAndVersion } from '~/npm/utils';
import { jsonErrorStatusMessageResponse } from '~/server/error';
import { isRequestSearchParamsHasCache } from '~/server/misc/is-request-search-params-has-cache';
import { createKeyedResponseMemoCache } from '~/server/remecache';

import og from '~/components/npm/imgx/og/package';

const withCache = createKeyedResponseMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (isRequestSearchParamsHasCache(event)) return json(Object.keys(withCache.get()));

		const [splittedName, splittedVersion] = splitPackageNameAndVersion(event.params['input']);

		const validPackageName = parseCachedPackageName(splittedName);

		return withCache(`${validPackageName}/${splittedVersion}`, async () => {
			const { version, description } = await fetchPackage(validPackageName, splittedVersion);
			return og(validPackageName, version, description);
		});
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
