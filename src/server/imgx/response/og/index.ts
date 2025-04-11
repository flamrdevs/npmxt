import { type CSS, type Children, h } from '~/imgx';

import { PNGImageResponse } from '../png';

import { height, width } from './config';

export { width, height };

export const OGImageResponse = (children: (e: typeof h.e) => Children, { style = {}, maxAge }: { style?: Partial<CSS.Properties.Root>; maxAge?: number } = {}) =>
	PNGImageResponse(h.r('div', { style: { width, height, ...style }, children: children(h.e) }), { maxAge });
