import { children, createMemo, Show, splitProps } from 'solid-js';
import { createDynamic } from 'solid-js/web';

import { mergeDefaultProps, type ValidationState } from '@kobalte/utils';
import { clsx } from 'clsx';
import { X } from 'lucide';

import { LucideIcon } from '../icons';
import { classesSplitter } from '../utils';

import './utils.css';

export type FormControlProps = {
	label?: string;
	description?: string;
	errorMessage?: string;
};

export type InlineFormControlProps = Pick<FormControlProps, 'label'> & {
	labelPosition?: 'left' | 'right';
};

export const formControlSplitter = ['label', 'description', 'errorMessage'] as const satisfies (keyof FormControlProps)[];
export const inlineFormControlSplitter = [formControlSplitter[0], 'labelPosition'] as const satisfies (keyof InlineFormControlProps)[];

export namespace ShowFormControlLayout {
	export type Props = Solid.ParentProps<
		FormControlProps & {
			Label: Solid.ParentComponent<Solid.ClassesProps>;
			Description: Solid.ParentComponent<Solid.ClassesProps>;
			ErrorMessage: Solid.ParentComponent<Solid.ClassesProps>;
		}
	>;
}
export const ShowFormControlLayout = (props: ShowFormControlLayout.Props) => {
	const scope = ShowFormControlLayout.scope;

	return (
		<>
			<Show when={props.label}>{(label) => createDynamic(() => props.Label, { class: `${scope}-label`, children: label() })}</Show>

			{props.children}

			<Show when={props.description}>{(description) => createDynamic(() => props.Description, { class: `${scope}-description`, children: description() })}</Show>
			<Show when={props.errorMessage}>{(errorMessage) => createDynamic(() => props.ErrorMessage, { class: `${scope}-ce-message`, children: errorMessage() })}</Show>
		</>
	);
};
ShowFormControlLayout.scope = 'xt-fc';

export namespace ShowInlineFormControlLayout {
	export type Props = Solid.ParentProps<
		InlineFormControlProps & {
			Label: Solid.ParentComponent<Solid.ClassesProps>;
			defaultLabelPosition: 'left' | 'right';
		}
	>;
}
export const ShowInlineFormControlLayout = (props: ShowInlineFormControlLayout.Props) => {
	props = mergeDefaultProps({ labelPosition: props.defaultLabelPosition }, props);

	const scope = ShowInlineFormControlLayout.scope;

	const labelPositionLeft = () => props.labelPosition === 'left';
	const labelPositionRight = () => props.labelPosition === 'right';

	const labelClass = createMemo(() => clsx(`${scope}-label`, labelPositionLeft() && 'x-l', labelPositionRight() && 'x-r'));

	const childrenPositionLeft = children(() => labelPositionRight() && props.children);
	const childrenPositionRight = children(() => labelPositionLeft() && props.children);

	return (
		<>
			{childrenPositionLeft()}

			<Show when={props.label}>{(label) => createDynamic(() => props.Label, { class: labelClass(), children: label() })}</Show>

			{childrenPositionRight()}
		</>
	);
};
ShowInlineFormControlLayout.scope = 'xt-inline-fc';

export const formControlValidationState = (props: FormControlProps): ValidationState | undefined => {
	if (props.errorMessage) return 'invalid';
};

export const CloseButton = (props: Solid.NeverChildrenProps<Solid.JSX.IntrinsicElements['button']>) => {
	const [classes, others] = splitProps(props, classesSplitter);
	return (
		<button class={clsx('xt-close-button', classes.class)} {...others}>
			<LucideIcon i={X} />
		</button>
	);
};
