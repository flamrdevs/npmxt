import type { Node } from '~/imgx';

import { createResponseInit, type Options } from './utils';

export const PNGImageResponse = async (node: Node.Root, options?: Options) => new Response(await (await import('~/imgx/png')).png(node), createResponseInit('image/png', options));
