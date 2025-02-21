import { defineConfig } from 'vitest/config';

import tsconfigPaths from 'vite-tsconfig-paths';

import solid from 'vite-plugin-solid';

import tailwindcss from '@tailwindcss/vite';

import define from './define';

export default defineConfig({
	plugins: [tsconfigPaths(), tailwindcss(), solid()] as any[],
	define: define({
		dev: true,
		test: true,
		msw: {
			delay: false,
		},
	}),
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.test.ts?(x)'],
		setupFiles: ['./vitest.setup.ts'],
	},
	resolve: {
		conditions: ['development', 'browser'],
	},
});
