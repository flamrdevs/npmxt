import { type ResvgRenderOptions, renderAsync } from '@resvg/resvg-js';

import { svg } from './svg';
import type { Node } from './types';

const resvgRenderOptions: ResvgRenderOptions = {
	fitTo: { mode: 'original' },
	imageRendering: 0,
	shapeRendering: 2,
	dpi: 300,
	font: {
		loadSystemFonts: false,
	},
};

export const png = async (node: Node.Root) => (await renderAsync(await svg(node), resvgRenderOptions)).asPng();
