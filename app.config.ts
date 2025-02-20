import { defineConfig } from '@solidjs/start/config';

import autoImport from './auto-import';

import define from './define';

const minify = true;

export default defineConfig({
	server: {
		preset: 'netlify_edge',
		prerender: {
			routes: ['/', '/ui'],
		},
		minify,
	},
	middleware: './src/middleware.ts',
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
		plugins: [autoImport()],
		build: {
			minify,
		},
	},
});
