import { http, HttpResponse, delay } from 'msw';

import prettyBytes from 'pretty-bytes';

import type { TBundleSizeSchema } from '~/bundlejs/schema';
import { BASE_URL_DENO as BUNDLEJS_BASE_URL_DENO } from '~/bundlejs/url';

const BUNDLE_SIZE_RECORD: Record<string, TBundleSizeSchema> = {};

export default [
	http.get<{ 0: string }>(`${BUNDLEJS_BASE_URL_DENO}/*`, async ({ request }) => {
		if (__MSW_DELAY__) await delay(1000);

		const q = new URL(request.url).searchParams.get('q');

		// FIX : should parse query

		if (q) {
			const uncompressedSize = range(10000, 100000);
			const compressedSize = Number(Math.floor(uncompressedSize * 0.4));

			return HttpResponse.json(
				(BUNDLE_SIZE_RECORD[q] ??= {
					size: {
						type: 'gzip',
						uncompressedSize: prettyBytes(uncompressedSize),
						compressedSize: prettyBytes(compressedSize),
					},
				} satisfies TBundleSizeSchema),
				{ status: 200 }
			);
		}

		throw HttpResponse.json({ error: 'not_found' }, { status: 404 });
	}),
];
