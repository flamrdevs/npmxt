import { splitProps } from 'solid-js';

import * as K from '@kobalte/core/text-field';

import { clsx } from 'clsx';

import { classesSplitter } from '../../utils';

import { type FormControlProps, ShowFormControlLayout, formControlSplitter, formControlValidationState } from './../utils';

import './text-field.css';

export namespace TextField {
	export type Props = Pick<K.TextFieldRootProps<'div'>, 'name' | 'value' | 'onChange' | 'readOnly' | 'disabled'> &
		FormControlProps &
		CLSX.ClassesValueProps & {
			type?: 'text' | 'password';
			placeholder?: string;
		};
}

const localSplitter = ['type', 'placeholder'] as const satisfies (keyof TextField.Props)[];

export const TextField = (props: TextField.Props) => {
	const [local, formControl, classes, others] = splitProps(props as TextField.Props, localSplitter, formControlSplitter, classesSplitter);

	const scope = 'xt-text-field';

	return (
		<K.Root class={clsx(ShowFormControlLayout.scope, scope, classes.class)} {...others} validationState={formControlValidationState(formControl)}>
			<ShowFormControlLayout {...formControl} Label={K.Label} Description={K.Description} ErrorMessage={K.ErrorMessage}>
				<K.Input class={`${scope}-input`} type={local.type} placeholder={local.placeholder} />
			</ShowFormControlLayout>
		</K.Root>
	);
};
