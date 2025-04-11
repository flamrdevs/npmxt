import { createStore } from 'solid-js/store';

import { Rocket } from 'lucide';

import { LucideIcon } from '~/components/icons';
import { Button, Checkbox, HoverCard, IconButton, Popover, Select, Separator, Switch, TextField, Tooltip } from '~/components/ui';
import * as defaultProps from '~/components/ui/default-props';

import { ControlColor, ControlDescription, ControlDisabled, ControlErrorMessage, ControlLabel, ControlLabelPosition, ControlPlaceholder, ControlSize, ControlTitle, Panel } from './utils';

export const blocks = Object.entries({
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
	['HoverCard']: () => {
		const [props, setProps] = createStore<HoverCard.Props>({
			trigger: (props) => <Button {...props}>Open</Button>,
			children: 'Content',
		});

		return (
			<Panel
				popover={
					<div class="flex flex-col gap-4 my-2 p-2">
						<TextField label="Children" value={props.children as string} onChange={(children) => setProps({ children })} />
					</div>
				}
			>
				<HoverCard {...props} />
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
