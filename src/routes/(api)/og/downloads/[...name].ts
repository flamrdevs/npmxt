import { json } from '@solidjs/router';

import { parseCachedPackageName } from '~/npm/schema';
import { fetchPackageDownloadsRangeLast } from '~/npm/utils';
import { jsonErrorStatusMessageResponse } from '~/server/error';
import { isRequestSearchParamsHasCache } from '~/server/misc/is-request-search-params-has-cache';
import { createKeyedResponseMemoCache } from '~/server/remecache';

import og from '~/components/npm/imgx/og/downloads';

const withCache = createKeyedResponseMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (isRequestSearchParamsHasCache(event)) return json(Object.keys(withCache.get()));

		return withCache(parseCachedPackageName(event.params['name']), async (validPackageName) => og(validPackageName, (await fetchPackageDownloadsRangeLast(validPackageName, 'year')).downloads));
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
