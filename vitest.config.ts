import { defineConfig } from 'vitest/config';

import tailwindcss from '@tailwindcss/vite';
import solid from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

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
		include: ['src/**/*.test.ts?(x)'],
		setupFiles: ['./vitest.setup.ts'],
		browser: {
			provider: 'playwright',
			enabled: true,
			instances: [{ browser: 'chromium' }],
		},
	},
	resolve: {
		conditions: ['development', 'browser'],
	},
});
