import { splitProps } from 'solid-js';

import * as K from '@kobalte/core/hover-card';

import './hover-card.css';

export namespace HoverCard {
	export type Props = Solid.ParentProps<
		Pick<K.HoverCardRootProps, 'open' | 'onOpenChange' | 'placement' | 'gutter'> & {
			trigger: Solid.Component<Record<string, any>>;
			triggerProps?: K.HoverCardTriggerProps;
		}
	>;
}

const localSplitter = ['trigger', 'triggerProps', 'children'] as const satisfies (keyof HoverCard.Props)[];

export const HoverCard = (props: HoverCard.Props) => {
	const [local, others] = splitProps(props as HoverCard.Props, localSplitter);

	const scope = 'xt-hover-card';

	return (
		<K.Root flip slide {...others}>
			<K.Trigger as={local.trigger} {...local.triggerProps} />
			<K.Portal>
				<K.Content class={`${scope}-content`}>
					<K.Arrow class={`${scope}-arrow`} style={{ fill: undefined, stroke: undefined }} />

					{local.children}
				</K.Content>
			</K.Portal>
		</K.Root>
	);
};
