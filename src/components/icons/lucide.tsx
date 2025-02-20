import type { IconNode } from 'lucide';
import { For } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export namespace LucideIcon {
	export type Props = {
		/**
		 * @description definition
		 */
		i: IconNode;
	} & Solid.ClassProps;
}

const forChild = (child: IconNode[number]) => <Dynamic component={child[0]} {...child[1]} />;

export const LucideIcon = (props: LucideIcon.Props) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: ignore
	<svg role="img" viewBox="0 0 24 24" class={`lucide${props.class ? ` ${props.class}` : ''}`}>
		<For each={props.i}>{forChild}</For>
	</svg>
);
