import { type ResponseMiddleware, createMiddleware } from '@solidjs/start/middleware';

import { NPMXT } from '~/utils/url';

export default createMiddleware({
	onBeforeResponse: [
		(event) => {
			console.log(`[${event.response.status}] ${event.request.url.slice(NPMXT.length)}`);
		},
	] as ResponseMiddleware[],
});
