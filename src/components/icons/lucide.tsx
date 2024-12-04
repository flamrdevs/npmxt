import type { IconNode, IconNodeChild } from 'lucide';
import { For } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import './lucide.css';

export namespace LucideIcon {
	export type Props = {
		/**
		 * @description definition
		 */
		i: IconNode;
	} & Solid.ClassProps;
}

const forChild = (child: IconNodeChild) => <Dynamic component={child[0]} {...child[1]} />;

export const LucideIcon = (props: LucideIcon.Props) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: ignore
	<svg role="img" viewBox="0 0 24 24" class={`ilcd${props.class ? ` ${props.class}` : ''}`}>
		<For each={props.i[2]}>{forChild}</For>
	</svg>
);
