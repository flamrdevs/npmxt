import type { Component, Node, Props, Tag } from './types';

const maybeJSX = (t: Tag | Component, p: Props): Node => (typeof t === 'function' ? t(p) : { type: t, props: p });

export const h = {
	r: (t: Tag | Component.Root, p: Props.Root): Node.Root => maybeJSX(t, p) as any,
	e: (t: Tag | Component.Default, p: Props.Default): Node.Default => maybeJSX(t, p) as any,
};
