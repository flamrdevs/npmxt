import { json } from '@solidjs/router';

import { handlePackageAllDownloadsRecord } from '~/npm/api/package-all-downloads-record/handle';
import { parseCachedPackageName } from '~/npm/schema';

import { jsonErrorStatusMessageResponse } from '~/server/error';
import { cacheControl } from '~/server/header';
import { isRequestSearchParamsHasCache } from '~/server/misc/is-request-search-params-has-cache';
import { createKeyedResponseMemoCache } from '~/server/remecache';

const withCache = createKeyedResponseMemoCache();

const init = {
	headers: cacheControl('public, max-age=43200, s-maxage=43200, must-revalidate' /* 12 hours */),
};

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (isRequestSearchParamsHasCache(event)) return json(Object.keys(withCache.get()));

		return withCache(parseCachedPackageName(event.params['name']), async (validPackageName) => {
			return json(await handlePackageAllDownloadsRecord(validPackageName), init);
		});
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
