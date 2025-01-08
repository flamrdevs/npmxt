import { HttpHeader } from '@solidjs/start';
import { For } from 'solid-js';
import { type SetStoreFunction, createStore } from 'solid-js/store';

import { useColorMode } from '@kobalte/core/color-mode';
import { Root as Link } from '@kobalte/core/link';

import { Palette, Rocket, Settings2 } from 'lucide';

import { LucideIcon } from '~/components/icons';
import * as Meta from '~/components/meta';
import { Button, Checkbox, IconButton, Popover, Select, Separator, Switch, TextField, Tooltip } from '~/components/ui';
import * as defaultProps from '~/components/ui/default-props';
import { entriesMap } from '~/utils/object';

const Blocks: Solid.Component = (() => {
	const Panel = (() => {
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

	const ControlColor = <M extends Record<string, string>, P extends { color?: Exclude<keyof M, number | symbol> }>(props: {
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

	const ControlSize = <M extends Record<string, string>, P extends { size?: Exclude<keyof M, number | symbol> }>(props: {
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

	const ControlTitle = <P extends { title?: string }>(props: {
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

	const ControlLabel = <P extends { label?: string }>(props: {
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

	const ControlDescription = <P extends { description?: string }>(props: {
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

	const ControlErrorMessage = <P extends { errorMessage?: string }>(props: {
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

	const ControlLabelPosition = <P extends { labelPosition?: 'left' | 'right' }>(props: { get: P; set: SetStoreFunction<P> }) => {
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

	const ControlPlaceholder = <P extends { placeholder?: string }>(props: {
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

	const ControlDisabled = <P extends { disabled?: boolean }>(props: {
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

	const blocks = Object.entries({
		['Button']: () => {
			const [props, setProps] = createStore<Button.Props<'button'>>({
				...defaultProps.ButtonVariants,
				disabled: false,
			});

			return (
				<Panel
					popover={
						<div class="flex flex-col gap-4 my-2 p-2">
							<ControlColor map={{ n: 'Neutral', p: 'Primary' }} get={props} set={setProps} />
							<Separator />
							<ControlSize map={{ sm: 'Small', md: 'Medium', lg: 'Large' }} get={props} set={setProps} />
							<Separator />
							<ControlDisabled get={props} set={setProps} />
						</div>
					}
				>
					<Button {...props}>Button</Button>
				</Panel>
			);
		},
		['IconButton']: () => {
			const [props, setProps] = createStore<IconButton.Props<'button'>>({
				...defaultProps.IconButtonVariants,
				disabled: false,
			});

			return (
				<Panel
					popover={
						<div class="flex flex-col gap-4 my-2 p-2">
							<ControlColor map={{ n: 'Neutral', p: 'Primary' }} get={props} set={setProps} />
							<Separator />
							<ControlSize map={{ sm: 'Small', md: 'Medium', lg: 'Large' }} get={props} set={setProps} />
							<Separator />
							<ControlDisabled get={props} set={setProps} />
						</div>
					}
				>
					<IconButton {...props} title="Rocket">
						<LucideIcon i={Rocket} />
					</IconButton>
				</Panel>
			);
		},
		['TextField']: () => {
			const [props, setProps] = createStore<TextField.Props>({
				label: 'Label',
				description: 'Description',
				errorMessage: '',
				placeholder: 'placeholder...',
				disabled: false,
			});

			return (
				<Panel
					popover={
						<div class="flex flex-col gap-4 my-2 p-2">
							<ControlLabel get={props} set={setProps} />
							<Separator />
							<ControlDescription get={props} set={setProps} />
							<Separator />
							<ControlErrorMessage get={props} set={setProps} />
							<Separator />
							<ControlPlaceholder get={props} set={setProps} />
							<Separator />
							<ControlDisabled get={props} set={setProps} />
						</div>
					}
				>
					<TextField {...props} />
				</Panel>
			);
		},
		['Select']: () => {
			const [props, setProps] = createStore<Select.Props>({
				options: [
					{ label: 'Item a', value: 'a' },
					{ label: 'Item b', value: 'b' },
					{ label: 'Item c', value: 'c' },
					{ label: 'Item d', value: 'd' },
					{ label: 'Item e', value: 'e' },
					{ label: 'Item f', value: 'f' },
					{ label: 'Item g', value: 'g' },
					{ label: 'Item h', value: 'h' },
				],
				label: 'Label',
				description: 'Description',
				errorMessage: '',
				placeholder: 'placeholder...',
				disabled: false,
			});

			return (
				<Panel
					popover={
						<div class="flex flex-col gap-4 my-2 p-2">
							<ControlLabel get={props} set={setProps} />
							<Separator />
							<ControlDescription get={props} set={setProps} />
							<Separator />
							<ControlErrorMessage get={props} set={setProps} />
							<Separator />
							<ControlPlaceholder get={props} set={setProps} />
							<Separator />
							<ControlDisabled get={props} set={setProps} />
						</div>
					}
				>
					<Select {...props} />
				</Panel>
			);
		},
		['Checkbox']: () => {
			const [props, setProps] = createStore<Checkbox.Props>({
				label: 'Label',
				labelPosition: 'right',
				disabled: false,
			});

			return (
				<Panel
					popover={
						<div class="flex flex-col gap-4 my-2 p-2">
							<ControlLabel get={props} set={setProps} />
							<Separator />
							<ControlLabelPosition get={props} set={setProps} />
							<Separator />
							<ControlDisabled get={props} set={setProps} />
						</div>
					}
				>
					<Checkbox {...props} />
				</Panel>
			);
		},
		['Switch']: () => {
			const [props, setProps] = createStore<Switch.Props>({
				label: 'Label',
				labelPosition: 'left',
				disabled: false,
			});

			return (
				<Panel
					popover={
						<div class="flex flex-col gap-4 my-2 p-2">
							<ControlLabel get={props} set={setProps} />
							<Separator />
							<ControlLabelPosition get={props} set={setProps} />
							<Separator />
							<ControlDisabled get={props} set={setProps} />
						</div>
					}
				>
					<Switch {...props} />
				</Panel>
			);
		},
		['Popover']: () => {
			const [props, setProps] = createStore<Popover.Props>({
				trigger: (props) => <Button {...props}>Open</Button>,
				title: 'Title',
				description: 'Description',
				children: 'Content',
			});

			return (
				<Panel
					popover={
						<div class="flex flex-col gap-4 my-2 p-2">
							<ControlTitle get={props} set={setProps} />
							<Separator />
							<ControlDescription get={props} set={setProps} />
							<Separator />
							<TextField label="Children" value={props.children as string} onChange={(children) => setProps({ children })} />
						</div>
					}
				>
					<Popover {...props} />
				</Panel>
			);
		},
		['Tooltip']: () => {
			const [props, setProps] = createStore<Omit<Tooltip.Props, 'children'> & { children: string }>({
				trigger: (props) => <Button {...props}>Hover</Button>,
				children: 'Content',
			});

			return (
				<Panel
					popover={
						<div class="flex flex-col gap-4 my-2 p-2">
							<TextField label="Children" value={props.children} onChange={(children) => setProps({ children })} />
						</div>
					}
				>
					<Tooltip {...props} />
				</Panel>
			);
		},
	} satisfies Record<string, () => Solid.JSX.Element>);

	return () => (
		<main class="flex flex-col gap-6 w-full max-w-5xl mx-auto p-2">
			<For each={blocks}>
				{([name, Component]) => (
					<section class="px-2 py-3">
						<Link href={`#${name}`} class="block mb-3 font-bold text-3xl select-none">
							{name}
						</Link>
						<div class="p-1">
							<Component />
						</div>
					</section>
				)}
			</For>
		</main>
	);
})();

export default function UIPage() {
	const { colorMode, setColorMode } = useColorMode();

	return (
		<>
			<HttpHeader name="x-robots-tag" value="noindex" />

			<Meta.Page title="UI" description="UI npmxt" img="ui" />

			<div class="w-full max-w-5xl mx-auto p-2">
				<div class="flex items-center justify-end p-2">
					<Popover
						trigger={(triggerProps) => (
							<IconButton {...triggerProps} title="Palette">
								<LucideIcon i={Palette} />
							</IconButton>
						)}
						title="Color Mode"
					>
						<div class="flex items-center gap-2 p-2 min-w-40">
							<Button color={colorMode() === 'light' ? 'p' : 'n'} class="w-24" onClick={() => setColorMode('light')}>
								light
							</Button>
							<Button color={colorMode() === 'dark' ? 'p' : 'n'} class="w-24" onClick={() => setColorMode('dark')}>
								dark
							</Button>
						</div>
					</Popover>
				</div>
			</div>

			<Blocks />
		</>
	);
}
