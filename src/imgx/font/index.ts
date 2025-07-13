import type { Font } from 'satori';

import { name } from './config';

const toBinary = (() => {
	const table = new Uint8Array(128);
	for (let i = 0; i < 64; i++) table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
	return (base64: string) => {
		const n = base64.length;
		// @ts-expect-error
		// biome-ignore lint/suspicious/noDoubleEquals: ok
		const bytes = new Uint8Array((((n - (base64[n - 1] == '=') - (base64[n - 2] == '=')) * 3) / 4) | 0);
		for (let i2 = 0, j = 0; i2 < n; ) {
			const c0 = table[base64.charCodeAt(i2++)];
			const c1 = table[base64.charCodeAt(i2++)];
			const c2 = table[base64.charCodeAt(i2++)];
			const c3 = table[base64.charCodeAt(i2++)];
			bytes[j++] = (c0 << 2) | (c1 >> 4);
			bytes[j++] = (c1 << 4) | (c2 >> 2);
			bytes[j++] = (c2 << 6) | c3;
		}
		return bytes.buffer;
	};
})();

const file = async (get: () => Promise<{ default: string }>, name: string, style?: Font['style'], weight?: Font['weight']) => ({
	data: toBinary((await get()).default),
	name,
	style,
	weight,
});

export const load = () =>
	Promise.all([
		file(() => import('./source-code-pro-400'), name, 'normal', 400),
		file(() => import('./source-code-pro-500'), name, 'normal', 500),
		file(() => import('./source-code-pro-600'), name, 'normal', 600),
		file(() => import('./source-code-pro-700'), name, 'normal', 700),
	]);
