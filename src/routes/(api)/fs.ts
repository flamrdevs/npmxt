import fs from 'node:fs/promises';
import path from 'node:path';

import { json } from '@solidjs/router';

import { jsonErrorStatusMessageResponse } from '~/server/error';

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		const url = new URL(event.request.url);

		if (!url.searchParams.has('path')) throw new Error("Require 'path'");

		return json(await fs.readdir(path.resolve(process.cwd(), url.searchParams.get('path') || '')));
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
