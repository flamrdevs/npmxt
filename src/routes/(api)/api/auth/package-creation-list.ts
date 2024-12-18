import { json } from '@solidjs/router';

import { db } from '~/db/db';
import { packageCreationTable } from '~/db/schema';

import { jsonErrorStatusMessageResponse } from '~/server/error';

export async function GET() {
	try {
		const rows = await db.select().from(packageCreationTable);

		return json(rows.map(({ n, d, t, r }) => [n, d, t, r]));
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
