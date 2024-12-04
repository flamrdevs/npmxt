import { json } from '@solidjs/router';

import { parsePackageName } from '~/npm/schema';
import { fetchPackage } from '~/npm/utils';
import { jsonErrorStatusMessageResponse } from '~/server/error';
import { isRequestSearchParamsHasCache } from '~/server/misc/is-request-search-params-has-cache';
import { createKeyedResponseMemoCache } from '~/server/remecache';

import og from '~/components/npm/imgx/og/package';

const withCache = createKeyedResponseMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (isRequestSearchParamsHasCache(event)) return json(Object.keys(withCache.get()));

		return withCache(parsePackageName(event.params['name']), async (validPackageName) => {
			const { version, description } = await fetchPackage(validPackageName);
			return og(validPackageName, version, description);
		});
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
