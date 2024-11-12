import { splitProps } from 'solid-js';

import * as K from '@kobalte/core/tooltip';

import './tooltip.css';

export namespace Tooltip {
	export type Props = Solid.ParentProps<
		Pick<K.TooltipRootProps, 'open' | 'onOpenChange' | 'placement' | 'gutter'> & {
			trigger: Solid.Component<Record<string, any>>;
			triggerProps?: K.TooltipTriggerProps;
		}
	>;
}

const localSplitter = ['trigger', 'triggerProps', 'children'] as const satisfies (keyof Tooltip.Props)[];

export const Tooltip = (props: Tooltip.Props) => {
	const [local, others] = splitProps(props as Tooltip.Props, localSplitter);

	const scope = 'xt-tooltip';

	return (
		<K.Root flip slide {...others}>
			<K.Trigger as={local.trigger} {...local.triggerProps} />
			<K.Portal>
				<K.Content class={`${scope}-content`}>
					<K.Arrow class={`${scope}-arrow`} size={20} style={{ fill: undefined, stroke: undefined }} />

					{local.children}
				</K.Content>
			</K.Portal>
		</K.Root>
	);
};
