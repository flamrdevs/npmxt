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
		/**
		 * @description size
		 */
		size?: number;
		/**
		 * @description stroke color
		 */
		color?: string;
	} & CLSX.ClassValueProps;
}

const DEFAULT_SIZE = 24;

const forChild = (child: IconNodeChild) => <Dynamic component={child[0]} {...child[1]} />;

export const LucideIcon = (props: LucideIcon.Props) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: ignore
	<svg role="img" viewBox="0 0 24 24" width={props.size ?? DEFAULT_SIZE} height={props.size ?? DEFAULT_SIZE} stroke={props.color ?? 'currentColor'} class={clsx('ilcd', props.class)}>
		<For each={props.i[2]}>{forChild}</For>
	</svg>
);
