import { createMemo, splitProps } from 'solid-js';

import { createControllableSignal } from '@kobalte/core/primitives/create-controllable-signal';
import * as K from '@kobalte/core/select';

import { Check, ChevronsUpDown } from 'lucide';

import { clsx } from 'clsx';

import { LucideIcon } from '../../icons';

import { classesSplitter } from '../../utils';

import { type FormControlProps, ShowFormControlLayout, formControlSplitter, formControlValidationState } from './../utils';

import './select.css';

export namespace Select {
	export type Item = {
		label: string;
		value: string;
		disabled?: boolean;
	};

	export type Props<V extends string = string> = Pick<Extract<K.SelectRootProps<Item>, { multiple?: false }>, 'placement' | 'gutter' | 'readOnly' | 'disabled'> &
		FormControlProps &
		CLSX.ClassesValueProps & {
			options: (Select.Item | string)[];
			value?: V;
			onChange?: (value: string) => void;
			placeholder?: string;
		};
}

const localSplitter = ['options', 'value', 'onChange'] as const satisfies (keyof Select.Props)[];

export const Select = <V extends string>(props: Select.Props<V>) => {
	const [local, formControl, classes, others] = splitProps(props as Select.Props, localSplitter, formControlSplitter, classesSplitter);

	const $options = createMemo<Select.Item[]>(() => local.options.map((option) => (typeof option === 'string' ? { label: option, value: option } : option)));

	const initialValue = local.value;

	const [stringValue, setStringValue] = createControllableSignal<string>({
		value: () => (initialValue === undefined ? undefined : (local.value ?? '')),
		onChange: (value) => local.onChange?.(value),
	});

	const $value = createMemo(() => {
		const $stringValue = stringValue();
		return $options().find((option) => option.value === $stringValue) || null;
	});

	const onChange = (value: Select.Item | null) => {
		setStringValue(value?.value || '');
	};

	const scope = 'xt-select';

	return (
		<K.Root<Select.Item>
			flip
			slide
			class={clsx(ShowFormControlLayout.scope, scope, classes.class)}
			{...others}
			options={$options()}
			value={$value()}
			onChange={onChange}
			multiple={false}
			optionValue="value"
			optionTextValue="label"
			optionDisabled="disabled"
			disallowEmptySelection
			itemComponent={(props) => (
				<K.Item item={props.item} class={`${scope}-item`}>
					<K.ItemLabel class={`${scope}-item-label`}>{props.item.rawValue.label}</K.ItemLabel>
					<K.ItemIndicator class={`${scope}-item-indicator`}>
						<LucideIcon i={Check} />
					</K.ItemIndicator>
				</K.Item>
			)}
			validationState={formControlValidationState(formControl)}
		>
			<ShowFormControlLayout {...formControl} Label={K.Label} Description={K.Description} ErrorMessage={K.ErrorMessage}>
				<K.Trigger class={`${scope}-trigger`}>
					<K.Value<Select.Item> class={`${scope}-value`}>{(state) => state.selectedOption().label}</K.Value>
					<K.Icon class={`${scope}-icon`}>
						<LucideIcon i={ChevronsUpDown} />
					</K.Icon>
				</K.Trigger>
			</ShowFormControlLayout>

			<K.Portal>
				<K.Content class={`${scope}-content`}>
					<K.Listbox class={`${scope}-listbox`} />
				</K.Content>
			</K.Portal>
		</K.Root>
	);
};
