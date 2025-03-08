import { defineConfig } from '@solidjs/start/config';

import tailwindcss from '@tailwindcss/vite';

import define from './define';

const minify = true;

export default defineConfig({
	server: {
		prerender: {
			routes: ['/', '/ui', '/packages'],
		},
		routeRules: {
			'/package/**': {
				isr: {
					expiration: 28800,
					allowQuery: ['xn', 'xp', 'pm', 'tab'],
				},
			},
			'/downloads/**': {
				isr: {
					expiration: 28800,
					allowQuery: ['xn', 'xp'],
				},
			},
		},
		minify,
	},
	vite: {
		define: define({
			dev: process.argv.includes('dev'),
			test: false,
			msw: process.argv.includes('--msw')
				? {
						delay: true,
					}
				: undefined,
		}),
		plugins: [tailwindcss()] as any[],
		build: {
			minify,
		},
	},
});
