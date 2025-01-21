import { type RequestMiddleware, type ResponseMiddleware, createMiddleware } from '@solidjs/start/middleware';

import { csrfProtection, secureRequest } from 'shieldwall/start';

import * as CSP from 'csp-header';

import { BASE_URL_DENO as BUNDLEJS_BASE_URL_DENO } from '~/bundlejs/url';
import { BASE_URL_API as NPM_BASE_URL_API, BASE_URL_REGISTRY as NPM_BASE_URL_REGISTRY } from '~/npm/url';
import { CDN_JSDELIVR, NPMXT } from '~/utils/url';

export default createMiddleware({
	onRequest: [
		csrfProtection,

		secureRequest({
			crossOriginResourcePolicy: 'same-origin',
			csp: (() => {
				const withNonce = false;

				// prod
				const DEFAULT_SRC = [CSP.SELF, CSP.UNSAFE_INLINE];
				const FRAME_SRC = [CSP.SELF];
				const SCRIPT_SRC = [CSP.SELF, CSP.UNSAFE_EVAL];
				const SCRIPT_SRC_ELEM = [CSP.SELF, CSP.UNSAFE_EVAL, CSP.UNSAFE_INLINE];
				const FONT_SRC = [CSP.SELF, CDN_JSDELIVR];
				const STYLE_SRC = [CSP.SELF, CSP.UNSAFE_INLINE];
				const STYLE_SRC_ELEM = [CSP.SELF];
				const CONNECT_SRC = [NPM_BASE_URL_API, NPM_BASE_URL_REGISTRY, BUNDLEJS_BASE_URL_DENO];
				const IMG_SRC = [CSP.SELF, CSP.DATA];

				return {
					prod: {
						withNonce,
						value: {
							'default-src': DEFAULT_SRC,
							'frame-src': FRAME_SRC,
							'script-src': SCRIPT_SRC,
							'script-src-elem': SCRIPT_SRC_ELEM,
							'font-src': FONT_SRC,
							'style-src': STYLE_SRC,
							'style-src-elem': STYLE_SRC_ELEM,
							'connect-src': [...[''] /* solve bug */, ...CONNECT_SRC],
							'img-src': IMG_SRC,
							'object-src': [],
						},
						cspReportOnly: true,
						cspBlock: true,
					},
					dev: {
						withNonce,
						value: {
							'default-src': DEFAULT_SRC,
							'frame-src': FRAME_SRC,
							'script-src': [...SCRIPT_SRC, CSP.UNSAFE_INLINE],
							'script-src-elem': SCRIPT_SRC_ELEM,
							'font-src': FONT_SRC,
							'style-src': STYLE_SRC,
							'style-src-elem': STYLE_SRC_ELEM,
							'connect-src': [...['', ''] /* solve bug */, ...CONNECT_SRC],
							'img-src': IMG_SRC,
							'object-src': [CSP.NONE],
						},
						cspReportOnly: false,
						cspBlock: true,
					},
				};
			})(),
		}),
	] as RequestMiddleware[],
	onBeforeResponse: [
		(event) => {
			console.log(`[${event.response.status}] ${event.request.url.slice(NPMXT.length)}`);
		},
	] as ResponseMiddleware[],
});
