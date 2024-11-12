import { useSearchParams } from '@solidjs/router';
import { For } from 'solid-js';

import { useColorMode } from '@kobalte/core/color-mode';
import * as KRadioGroup from '@kobalte/core/radio-group';

import { Check, Settings } from 'lucide';

import { NEUTRAL, NEUTRAL_DATA_ATTR, NEUTRAL_QUERY, PRIMARY, PRIMARY_DATA_ATTR, PRIMARY_QUERY, validNeutral, validPrimary } from '~/theme/utils';

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
	type RawParams = {
		xn?: string; // neutral
		xp?: string; // primary
	};

	const [searchParams, setSearchParams] = useSearchParams<RawParams>();

	const { colorMode, setColorMode } = useColorMode();

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

				<ColorSelect
					label="Neutral"
					options={NEUTRAL}
					value={validNeutral(searchParams[NEUTRAL_QUERY])}
					onChange={(value) => {
						setSearchParams({ [NEUTRAL_QUERY]: value }, { replace: true });
						document.documentElement.setAttribute(NEUTRAL_DATA_ATTR, value);
					}}
				/>

				<ColorSelect
					label="Primary"
					options={PRIMARY}
					value={validPrimary(searchParams[PRIMARY_QUERY])}
					onChange={(value) => {
						setSearchParams({ [PRIMARY_QUERY]: value }, { replace: true });
						document.documentElement.setAttribute(PRIMARY_DATA_ATTR, value);
					}}
				/>

				<Switch
					label="Dark mode"
					checked={colorMode() === 'dark'}
					onChange={(checked) => {
						setColorMode(checked ? 'dark' : 'light');
					}}
					class="min-w-48"
				/>
			</div>
		</Popover>
	);
};
