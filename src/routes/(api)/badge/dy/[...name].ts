import { json } from '@solidjs/router';

import { parseCachedPackageName } from '~/npm/schema';
import { fetchPackageDownloadsRangeLast } from '~/npm/utils';
import { jsonErrorStatusMessageResponse } from '~/server/error';
import { isRequestSearchParamsHasCache } from '~/server/misc/is-request-search-params-has-cache';
import { createKeyedResponseMemoCache } from '~/server/remecache';

import * as badge from '~/components/npm/imgx/badge/downloads';

const withCache = createKeyedResponseMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (isRequestSearchParamsHasCache(event)) return json(Object.keys(withCache.get()));

		return withCache(parseCachedPackageName(event.params['name']), async (validPackageName) =>
			badge.y((await fetchPackageDownloadsRangeLast(validPackageName, 'year')).downloads.reduce((a, { downloads }) => a + downloads, 0))
		);
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
