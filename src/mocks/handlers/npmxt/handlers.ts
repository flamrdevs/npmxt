import { delay, HttpResponse, http } from 'msw';

import type { TPackageNameSchema } from '~/npm/schema';

import { MOCK_PACKAGE } from '../registry.npmjs/handlers';

export default [
	http.get<{ 0: string }>('/api/package-creation/*', async ({ params }) => {
		if (__MSW_DELAY__) await delay(1000);

		const nameParam = params['0'];

		if (nameParam in MOCK_PACKAGE) {
			const name = nameParam as TPackageNameSchema;
			return HttpResponse.json({ date: MOCK_PACKAGE[name].time.created } satisfies { date: string }, { status: 200 });
		}

		throw HttpResponse.json({ error: 'not_found' }, { status: 404 });
	}),
];
