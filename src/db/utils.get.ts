import { json } from '@solidjs/router';
import { GET } from '@solidjs/start';

import { db } from './db';
import { packageCreationTable } from './schema';

export const getAllPackageCreation = GET(async () => {
	'use server';

	if (__DEV__) console.log('USE SERVER | getAllPackageCreation');

	const rows = await db.select().from(packageCreationTable);

	return json(rows);
});
