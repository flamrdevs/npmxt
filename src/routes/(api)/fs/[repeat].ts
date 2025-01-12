import fs from 'node:fs/promises';
import path from 'node:path';

import { json } from '@solidjs/router';

import * as v from 'valibot';

import { jsonErrorStatusMessageResponse } from '~/server/error';
import { createParser } from '~/utils/valibot';

const parseRepeat = createParser(
	v.pipe(
		v.string(),
		v.transform((input) => Number.parseInt(input)),
		v.number(),
		v.integer(),
		v.minValue(0)
	)
);

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		return json(await fs.readdir(path.resolve(process.cwd(), '../'.repeat(parseRepeat(event.params['repeat'])))));
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
