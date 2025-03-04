import { createMemo, splitProps } from 'solid-js';

import * as K from '@kobalte/core/button';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';

import { type VariantsOf, klass } from '@klass/core';

import { classesSplitter, klassXVariants } from '../../utils';

import './icon-button.css';

type As = 'button';

export namespace IconButton {
	export type Variants = VariantsOf<typeof iconButtonVariants>;

	export type Props<T extends Solid.ValidComponent = As> = K.ButtonRootProps<T> & CLSX.ClassesValueProps & Variants;
}

export const defaultIconButtonVariantsProps = {
	color: 'n',
	size: 'md',
} as const;

export const iconButtonVariants = klass({
	base: 'xt-icon-button',
	variants: klassXVariants({
		color: ['n', 'p'],
		size: ['sm', 'md', 'lg'],
	}),
	defaults: defaultIconButtonVariantsProps,
});

export const IconButton = <T extends Solid.ValidComponent = As>(props: PolymorphicProps<T, IconButton.Props<T>>) => {
	const [classes, variants, others] = splitProps(props as IconButton.Props, classesSplitter, iconButtonVariants.k);

	const $class = createMemo(() => iconButtonVariants(variants, classes.class));

	return <K.Root<As> class={$class()} {...others} />;
};
