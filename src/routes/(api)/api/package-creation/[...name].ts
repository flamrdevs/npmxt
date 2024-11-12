import { json } from '@solidjs/router';

import { eq } from 'drizzle-orm';

import { db } from '~/db/db';
import { packageCreationTable } from '~/db/schema';

import { parsePackageName } from '~/npm/schema';
import { fetchPackageMetadata } from '~/npm/utils';
import { jsonErrorStatusMessageResponse } from '~/server/error';
import { cacheControl } from '~/server/header';
import { createKeyedMemoCache } from '~/server/memo-cache';

const withCache = createKeyedMemoCache();

const getPackageCreationDate = async (validName: string): Promise<string> => {
	const now = Date.now();

	const where = eq(packageCreationTable.n, validName);

	const rows = await db.select({ d: packageCreationTable.d, t: packageCreationTable.t }).from(packageCreationTable).where(where).limit(1);

	if (rows.length && now < rows[0].t) {
		if (__DEV__) console.log(`[db:package_creation] ${'cache hit'.padEnd(11)} | ${validName}`);
		return rows[0].d;
	}

	const {
		name,
		time: { created: date },
	} = await fetchPackageMetadata(validName);

	const t = now + 2592000000; // + 30 days

	if (rows.length) {
		await db.update(packageCreationTable).set({ d: date, t }).where(where);
	} else {
		await db.insert(packageCreationTable).values({ n: name, d: date, t });
	}
	if (__DEV__) console.log(`[db:package_creation] ${'cache miss'.padEnd(11)} | ${validName}`);
	return date;
};

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (__DEV__) if (new URL(event.request.url).searchParams.has('cache')) return json(Object.keys(withCache.get()));

		const validName = parsePackageName(event.params['name']);

		return await withCache(validName, async () => {
			return json(
				{ date: await getPackageCreationDate(validName) },
				{
					headers: {
						...cacheControl('public, durable, max-age=43200, s-maxage=43200, must-revalidate' /* 12 hours */),
					},
				}
			);
		});
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
