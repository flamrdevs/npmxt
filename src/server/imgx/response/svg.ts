import type { Node } from '~/imgx';

import { SVGContentType } from './../type';
import { type Options, createResponseInit } from './../utils';

export const SVGImageResponse = async (node: Node.Root, options?: Options) => new Response(await (await import('~/imgx/svg')).svg(node), createResponseInit(SVGContentType, options));
