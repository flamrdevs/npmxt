import { Show, createMemo, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import * as K from '@kobalte/core/tabs';

import { clsx } from 'clsx';

import { classesSplitter, classesToArray } from '../../utils';

import './tabs.css';

export namespace Tabs {
	export type Element = {
		label: string;
		trigger: () => Solid.JSX.Element;
		content: () => Solid.JSX.Element;
	};

	export type Props<V extends string> = TF.Merge<
		K.TabsRootProps,
		{
			value: V;
			onChange: (value: V) => void;
		}
	> &
		CLSX.ClassesValueProps & {
			elements: Record<V, Element>;
		};
}

const localSplitter = ['value', 'onChange', 'elements'] as const satisfies (keyof Tabs.Props<any>)[];

export const Tabs = <V extends string>(props: Tabs.Props<V>) => {
	const [local, classes, others] = splitProps(props as Tabs.Props<any>, localSplitter, classesSplitter);

	const scope = 'xt-tabs';

	const elements = createMemo(() => {
		const elements = local.elements;

		if (Object.keys(elements).length) {
			const triggers: Solid.JSX.Element = [];
			const contents: Solid.JSX.Element = [];

			for (const value in local.elements) {
				const element = local.elements[value];

				triggers.push((() => (
					<K.Trigger value={value} class={`${scope}-trigger`} aria-label={element.label}>
						<Dynamic component={element.trigger} />
					</K.Trigger>
				)) as unknown as Solid.JSX.Element);
				contents.push((() => (
					<K.Content value={value} class={`${scope}-content`}>
						<Dynamic component={element.content} />
					</K.Content>
				)) as unknown as Solid.JSX.Element);
			}

			triggers.push((() => <K.Indicator class={`${scope}-indicator`} />) as unknown as Solid.JSX.Element);

			return { triggers, contents };
		}
	});

	return (
		<K.Root class={clsx(scope, classesToArray(classes))} value={local.value} onChange={local.onChange} {...others}>
			<Show when={elements()}>
				{(elements) => (
					<>
						<K.List class={`${scope}-list`}>{elements().triggers}</K.List>
						{elements().contents}
					</>
				)}
			</Show>
		</K.Root>
	);
};
