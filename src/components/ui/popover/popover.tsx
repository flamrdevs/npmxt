import { Show, splitProps } from 'solid-js';

import * as K from '@kobalte/core/popover';

import { CloseButton } from './../utils';

import './popover.css';

export namespace Popover {
	export type Props = Solid.ParentProps<
		Pick<K.PopoverRootProps, 'open' | 'onOpenChange' | 'placement' | 'gutter'> & {
			trigger: Solid.Component<Record<string, any>>;
			triggerProps?: K.PopoverTriggerProps;
			title?: string;
			description?: string;
		}
	>;
}

const localSplitter = ['trigger', 'triggerProps', 'title', 'description', 'children'] as const satisfies (keyof Popover.Props)[];

export const Popover = (props: Popover.Props) => {
	const [local, others] = splitProps(props as Popover.Props, localSplitter);

	const scope = 'xt-popover';

	return (
		<K.Root flip slide {...others}>
			<K.Trigger as={local.trigger} {...local.triggerProps} />
			<K.Portal>
				<K.Content class={`${scope}-content`}>
					<K.Arrow class={`${scope}-arrow`} style={{ fill: undefined, stroke: undefined }} />
					<K.CloseButton as={CloseButton} class={`${scope}-close-button`} />

					<Show when={local.title}>{(title) => <K.Title class={`${scope}-title`}>{title()}</K.Title>}</Show>
					<Show when={local.description}>{(description) => <K.Description class={`${scope}-description`}>{description()}</K.Description>}</Show>

					{local.children}
				</K.Content>
			</K.Portal>
		</K.Root>
	);
};
