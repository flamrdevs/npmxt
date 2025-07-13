import { createMemo, splitProps } from 'solid-js';

import { klass, type VariantsOf } from '@klass/core';
import type { PolymorphicProps } from '@kobalte/core/polymorphic';
import * as K from '@kobalte/core/separator';

import { classesSplitter, klassXVariants } from '../../utils';

import './separator.css';

type As = 'hr';

export namespace Separator {
	export type Variants = VariantsOf<typeof separatorVariants>;

	export type Props<T extends Solid.ValidComponent = As> = K.SeparatorRootProps<T> & CLSX.ClassesValueProps & Variants;
}

export const defaultSeparatorVariantsProps = {
	color: 'n3',
} as const;

export const separatorVariants = klass({
	base: 'xt-separator',
	variants: klassXVariants({
		color: ['n3', 'n6', 'p3', 'p6'],
	}),
	defaults: defaultSeparatorVariantsProps,
});

export const Separator = <T extends Solid.ValidComponent = As>(props: PolymorphicProps<T, Separator.Props<T>>) => {
	const [classes, variants, others] = splitProps(props as Separator.Props, classesSplitter, separatorVariants.k);

	const $class = createMemo(() => separatorVariants(variants, classes.class));

	return <K.Root<As> class={$class()} {...others} />;
};
