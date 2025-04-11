import { For } from 'solid-js';

import * as KRadioGroup from '@kobalte/core/radio-group';

import { Check, Settings } from 'lucide';

import * as THEME_CORE from '~/theme/core/core';
import { changeMode, changeNeutral, changePrimary, mode, neutral, primary } from '~/theme/state/state';

import { LucideIcon } from '../icons';
import { IconButton, Popover, Separator, Switch, Tooltip } from '../ui';

const ColorSelect = (props: Pick<KRadioGroup.RadioGroupRootProps, 'value' | 'onChange'> & { label: string; options: string[] }) => {
	return (
		<KRadioGroup.Root {...props} class="w-full">
			<KRadioGroup.Label class="block mb-1 md:mb-1.5 font-medium text-base text-cn-12 select-none">{props.label}</KRadioGroup.Label>
			<div class="flex items-center gap-1 md:gap-2" role="presentation">
				<For each={props.options}>
					{(option) => (
						<KRadioGroup.Item value={option} class="shrink-0">
							<KRadioGroup.ItemInput class="peer" />

							<Tooltip
								trigger={(props) => (
									<KRadioGroup.ItemControl
										{...props}
										class="flex items-center justify-center size-7 bg-cp-9 rounded-lg peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-cp-9 peer-focus-visible:ring-offset-cp-2"
										style={{
											'--c-p-2': `var(--c-${option}-2)`,
											'--c-p-9': `var(--c-${option}-9)`,
										}}
									>
										<KRadioGroup.ItemIndicator class="text-white">
											<LucideIcon i={Check} class="size-4" />
										</KRadioGroup.ItemIndicator>
									</KRadioGroup.ItemControl>
								)}
								placement="top"
							>
								{option}
							</Tooltip>
						</KRadioGroup.Item>
					)}
				</For>
			</div>
		</KRadioGroup.Root>
	);
};

export const NPMSettings = () => {
	return (
		<Popover
			trigger={(props) => (
				<Tooltip
					trigger={(props) => (
						<IconButton {...props}>
							<LucideIcon i={Settings} />
						</IconButton>
					)}
					triggerProps={props}
					placement="top"
				>
					settings
				</Tooltip>
			)}
			title="Settings"
		>
			<div class="flex flex-col gap-4 my-2 p-2">
				<div class="flex items-center gap-2 md:gap-3">
					<span>Theme</span>
					<Separator class="grow" />
				</div>

				<Switch
					label="Dark mode"
					checked={mode() === 'dark'}
					onChange={(checked) => {
						changeMode(checked ? 'dark' : 'light');
					}}
				/>

				<ColorSelect
					label="Neutral"
					options={THEME_CORE.NEUTRAL}
					value={neutral()}
					onChange={(value) => {
						changeNeutral(value);
					}}
				/>

				<ColorSelect
					label="Primary"
					options={THEME_CORE.PRIMARY}
					value={primary()}
					onChange={(value) => {
						changePrimary(value);
					}}
				/>
			</div>
		</Popover>
	);
};
