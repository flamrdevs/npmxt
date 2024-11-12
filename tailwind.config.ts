import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

import * as colors from './tailwind.config.colors';

export default {
	content: ['./src/**/*.{ts,tsx}'],
	darkMode: ['selector', '[data-kb-theme="dark"]'],
	theme: {
		colors: colors.theme,
		fontFamily: {
			sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
			mono: ['Source Code Pro Variable', ...defaultTheme.fontFamily.mono],
		},
	},
	plugins: [colors.plugin()],
} satisfies Config;
