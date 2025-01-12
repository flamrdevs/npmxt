import fs from 'node:fs/promises';

import { json } from '@solidjs/router';

import { jsonErrorStatusMessageResponse } from '~/server/error';

export async function GET() {
	try {
		return json(await fs.readdir(process.cwd(), { recursive: true }));
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
