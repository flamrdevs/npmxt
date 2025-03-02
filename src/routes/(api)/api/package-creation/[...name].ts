import { json } from '@solidjs/router';

import { handlePackageCreation } from '~/npm/api/package-creation/handle';
import { parseCachedPackageName } from '~/npm/schema';

import { jsonErrorStatusMessageResponse } from '~/server/error';
import { cacheControl } from '~/server/header';
import { isRequestSearchParamsHasCache } from '~/server/misc/is-request-search-params-has-cache';
import { createKeyedResponseMemoCache } from '~/server/remecache';

const withCache = createKeyedResponseMemoCache();

const init = {
	headers: cacheControl('public, max-age=7776000, s-maxage=7776000, must-revalidate' /* 90 days */),
};

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (isRequestSearchParamsHasCache(event)) return json(Object.keys(withCache.get()));

		return withCache(parseCachedPackageName(event.params['name']), async (validPackageName) => {
			return json(await handlePackageCreation(validPackageName), init);
		});
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
