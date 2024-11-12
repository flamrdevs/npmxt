import { json } from '@solidjs/router';

import { parsePackageName } from '~/npm/schema';
import { fetchPackageLastDownloadsRange } from '~/npm/utils';
import { jsonErrorStatusMessageResponse } from '~/server/error';
import { createKeyedMemoCache } from '~/server/memo-cache';

import * as badge from '~/components/npm/imgx/badge/downloads';

const withCache = createKeyedMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (new URL(event.request.url).searchParams.has('cache')) return json(Object.keys(withCache.get()));

		const validName = parsePackageName(event.params['name']);

		return await withCache(validName, async () => {
			const { downloads } = await fetchPackageLastDownloadsRange(validName, 'year');
			return await badge.y(downloads.reduce((a, { downloads }) => a + downloads, 0));
		});
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
