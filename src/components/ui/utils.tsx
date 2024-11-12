import { Show, children, createMemo, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { type ValidationState, mergeDefaultProps } from '@kobalte/utils';

import { X } from 'lucide';

import { classesSplitter, classesToArray } from '../utils';

import { LucideIcon } from '../icons';

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
			<Show when={props.label}>
				{(label) => (
					<Dynamic component={props.Label} class={`${scope}-label`}>
						{label()}
					</Dynamic>
				)}
			</Show>

			{props.children}

			<Show when={props.description}>
				{(description) => (
					<Dynamic component={props.Description} class={`${scope}-description`}>
						{description()}
					</Dynamic>
				)}
			</Show>
			<Show when={props.errorMessage}>
				{(errorMessage) => (
					<Dynamic component={props.ErrorMessage} class={`${scope}-ce-message`}>
						{errorMessage()}
					</Dynamic>
				)}
			</Show>
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

			<Show when={props.label}>
				{(label) => (
					<Dynamic component={props.Label} class={labelClass()}>
						{label()}
					</Dynamic>
				)}
			</Show>

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
		<button class={clsx('xt-close-button', classesToArray(classes))} {...others}>
			<LucideIcon i={X} />
		</button>
	);
};
