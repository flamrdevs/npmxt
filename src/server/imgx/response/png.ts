import type { Node } from '~/imgx';

import { PNGContentType } from './../type';
import { type Options, createResponseInit } from './../utils';

export const PNGImageResponse = async (node: Node.Root, options?: Options) => new Response(await (await import('~/imgx/png')).png(node), createResponseInit(PNGContentType, options));
