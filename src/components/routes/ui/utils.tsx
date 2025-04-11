import type { SetStoreFunction } from 'solid-js/store';

import { Settings2 } from 'lucide';

import { LucideIcon } from '~/components/icons';
import { IconButton, Popover, Select, Switch, TextField } from '~/components/ui';

import { entriesMap } from '~/utils/object';

export const Panel = (() => {
	const PopoverTrigger = (props: Record<string, any>) => (
		<IconButton {...props} class="absolute top-4 right-4 z-50" title="Settings">
			<LucideIcon i={Settings2} />
		</IconButton>
	);
	return (props: {
		popover: Solid.JSX.Element;
		children: Solid.JSX.Element;
	}) => (
		<div class="relative flex items-center justify-center gap-4 w-full min-h-64 bg-cn-1 border border-cn-3 rounded-3xl">
			{props.children}

			<Popover trigger={PopoverTrigger} title="Props">
				{props.popover}
			</Popover>
		</div>
	);
})();

export const ControlColor = <M extends Record<string, string>, P extends { color?: Exclude<keyof M, number | symbol> }>(props: {
	map: M;
	get: P;
	set: SetStoreFunction<P>;
}) => {
	return (
		<Select<Exclude<keyof M, number | symbol>>
			options={entriesMap(props.map, ([value, label]) => ({
				label,
				value,
			}))}
			label="Color"
			placeholder="Select color..."
			value={props.get.color}
			onChange={(value) => {
				if (value in props.map) props.set('color' as any, value);
			}}
		/>
	);
};

export const ControlSize = <M extends Record<string, string>, P extends { size?: Exclude<keyof M, number | symbol> }>(props: {
	map: M;
	get: P;
	set: SetStoreFunction<P>;
}) => {
	return (
		<Select<Exclude<keyof M, number | symbol>>
			options={entriesMap(props.map, ([value, label]) => ({
				label,
				value,
			}))}
			label="Size"
			placeholder="Select size..."
			value={props.get.size}
			onChange={(value) => {
				if (value in props.map) props.set('size' as any, value);
			}}
		/>
	);
};

export const ControlTitle = <P extends { title?: string }>(props: {
	get: P;
	set: SetStoreFunction<P>;
}) => (
	<TextField
		label="Title"
		placeholder="Title..."
		value={props.get.title}
		onChange={(value) => {
			props.set('title' as any, value);
		}}
	/>
);

export const ControlLabel = <P extends { label?: string }>(props: {
	get: P;
	set: SetStoreFunction<P>;
}) => (
	<TextField
		label="Label"
		placeholder="Label..."
		value={props.get.label}
		onChange={(value) => {
			props.set('label' as any, value);
		}}
	/>
);

export const ControlDescription = <P extends { description?: string }>(props: {
	get: P;
	set: SetStoreFunction<P>;
}) => (
	<TextField
		label="Description"
		placeholder="Description..."
		value={props.get.description}
		onChange={(value) => {
			props.set('description' as any, value);
		}}
	/>
);

export const ControlErrorMessage = <P extends { errorMessage?: string }>(props: {
	get: P;
	set: SetStoreFunction<P>;
}) => (
	<TextField
		label="Error message"
		placeholder="Error message..."
		value={props.get.errorMessage}
		onChange={(value) => {
			props.set('errorMessage' as any, value);
		}}
	/>
);

export const ControlLabelPosition = <P extends { labelPosition?: 'left' | 'right' }>(props: { get: P; set: SetStoreFunction<P> }) => {
	type Value = 'left' | 'right';
	const labelPositionValueLabel: Record<Value, string> = {
		left: 'Left',
		right: 'Right',
	};
	return (
		<Select<Value>
			options={entriesMap(labelPositionValueLabel, ([value, label]) => ({
				label,
				value,
			}))}
			label="Label position"
			placeholder="Select label position..."
			value={props.get.labelPosition}
			onChange={(value) => {
				if (value in labelPositionValueLabel) props.set('labelPosition' as any, value);
			}}
		/>
	);
};

export const ControlPlaceholder = <P extends { placeholder?: string }>(props: {
	get: P;
	set: SetStoreFunction<P>;
}) => (
	<TextField
		label="Placeholder"
		placeholder="Placeholder..."
		value={props.get.placeholder}
		onChange={(value) => {
			props.set('placeholder' as any, value);
		}}
	/>
);

export const ControlDisabled = <P extends { disabled?: boolean }>(props: {
	get: P;
	set: SetStoreFunction<P>;
}) => (
	<Switch
		label="Disabled"
		checked={props.get.disabled}
		onChange={(value) => {
			props.set('disabled' as any, value);
		}}
	/>
);
