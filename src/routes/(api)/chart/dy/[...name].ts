import { json } from '@solidjs/router';

import { parsePackageName } from '~/npm/schema';
import { fetchPackageDownloadsRangeLast } from '~/npm/utils';
import { jsonErrorStatusMessageResponse } from '~/server/error';
import { isRequestSearchParamsHasCache } from '~/server/misc/is-request-search-params-has-cache';
import { createKeyedResponseMemoCache } from '~/server/remecache';

import * as chart from '~/components/npm/imgx/chart/downloads';

const withCache = createKeyedResponseMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (isRequestSearchParamsHasCache(event)) return json(Object.keys(withCache.get()));

		return withCache(parsePackageName(event.params['name']), async (validPackageName) => chart.y((await fetchPackageDownloadsRangeLast(validPackageName, 'year')).downloads));
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
