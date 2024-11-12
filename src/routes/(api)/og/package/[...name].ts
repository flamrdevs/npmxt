import { json } from '@solidjs/router';

import { parsePackageName } from '~/npm/schema';
import { fetchPackage } from '~/npm/utils';
import { jsonErrorStatusMessageResponse } from '~/server/error';
import { createKeyedMemoCache } from '~/server/memo-cache';

import og from '~/components/npm/imgx/og/package';

const withCache = createKeyedMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (new URL(event.request.url).searchParams.has('cache')) return json(Object.keys(withCache.get()));

		const validName = parsePackageName(event.params['name']);

		return await withCache(validName, async () => {
			const { version, description } = await fetchPackage(validName);
			return await og(validName, version, description);
		});
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
