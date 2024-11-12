import type { SharedOptions } from 'msw';

import { CDN_JSDELIVR } from '~/utils/url';

const includes = ['_build', '_server', 'turso.io', CDN_JSDELIVR];

export const onUnhandledRequest: SharedOptions['onUnhandledRequest'] = (request, print) => {
	if (includes.some((include) => request.url.includes(include))) return;
	print.warning();
};
