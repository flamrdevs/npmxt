import fs from 'node:fs/promises';

import type { Font } from 'satori';

import { name, weights } from './config';

const file = async (source: string, name: string, style?: Font['style'], weight?: Font['weight']) => ({
	data: await fs.readFile(source),
	name,
	style,
	weight,
});

export const load = () => Promise.all(weights.map((weight) => file(`./assets/fonts/${name}-${weight}.woff`, name, 'normal', weight)));
