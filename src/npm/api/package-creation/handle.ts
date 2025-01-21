import { eq } from 'drizzle-orm';

import { db } from '~/db/db';
import { packageCreationTable } from '~/db/schema';

import type { TPackageNameSchema } from '~/npm/schema';
import { fetchPackageMetadata } from '~/npm/utils';

import type { PackageCreationData } from './types';

const handlePackageCreationDate = async (validPackageName: TPackageNameSchema): Promise<string> => {
	const now = Date.now();

	const where = eq(packageCreationTable.n, validPackageName);

	const rows = await db.select({ d: packageCreationTable.d, t: packageCreationTable.t }).from(packageCreationTable).where(where).limit(1);

	if (rows.length && now < rows[0].t) {
		if (__DEV__) console.log(`[db:package_creation] ${'cache hit'.padEnd(11)} | ${validPackageName}`);
		return rows[0].d;
	}

	const {
		name,
		time: { created: date },
	} = await fetchPackageMetadata(validPackageName);

	const t = now + 2592000000; // + 30 days

	if (rows.length) {
		await db.update(packageCreationTable).set({ d: date, t, r: now }).where(where);
	} else {
		await db.insert(packageCreationTable).values({ n: name, d: date, t, r: now });
	}
	if (__DEV__) console.log(`[db:package_creation] ${'cache miss'.padEnd(11)} | ${validPackageName}`);
	return date;
};

export const handlePackageCreation = async (validPackageName: TPackageNameSchema): Promise<PackageCreationData> => ({ date: await handlePackageCreationDate(validPackageName) });
