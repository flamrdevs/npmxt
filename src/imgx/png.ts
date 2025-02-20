import fsp from 'node:fs/promises';

import { Resvg, type ResvgRenderOptions, initWasm } from '@resvg/resvg-wasm';

import { NPMXT } from '~/utils/url';

import type { Node } from './types';

import { svg } from './svg';

const resvgRenderOptions: ResvgRenderOptions = {
	fitTo: { mode: 'original' },
	imageRendering: 0,
	shapeRendering: 2,
	dpi: 300,
	font: {
		loadSystemFonts: false,
	},
};

// TODO shouldInitWasm loading
let shouldInitWasm = true;

export const png = async (node: Node.Root) => {
	if (shouldInitWasm) {
		await initWasm(await fetch(`${NPMXT}/index_bg.wasm`));
		shouldInitWasm = false;
		console.log({ cwd: await fsp.readdir(process.cwd()) });
	}

	const resvg = new Resvg(await svg(node), resvgRenderOptions);

	const rendered = resvg.render();

	resvg.free();

	const png = rendered.asPng();

	rendered.free();

	return png;
};
