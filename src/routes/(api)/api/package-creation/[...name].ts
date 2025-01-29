import { json } from '@solidjs/router';

import { handlePackageCreation } from '~/npm/api/package-creation/handle';
import cacheHeader12H from '~/npm/api/shared/cache-header-12h';
import { parseCachedPackageName } from '~/npm/schema';

import { jsonErrorStatusMessageResponse } from '~/server/error';
import { isRequestSearchParamsHasCache } from '~/server/misc/is-request-search-params-has-cache';
import { createKeyedResponseMemoCache } from '~/server/remecache';

const withCache = createKeyedResponseMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (isRequestSearchParamsHasCache(event)) return json(Object.keys(withCache.get()));

		return withCache(parseCachedPackageName(event.params['name']), async (validPackageName) => {
			return json(await handlePackageCreation(validPackageName), cacheHeader12H);
		});
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
