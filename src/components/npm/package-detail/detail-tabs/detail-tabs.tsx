import { createDynamic } from 'solid-js/web';
import { useSearchParams } from '@solidjs/router';

import { type IconNode, LineChart, Network } from 'lucide';

import { LucideIcon } from '~/components/icons';
import { Tabs } from '~/components/ui';

import { TabDependencies } from './tab-dependencies/tab-dependencies';
import { TabDownloads } from './tab-downloads/tab-downloads';

type TabsValue = keyof typeof TABS_ELEMENTS;

const createTab = (label: string, lucideIcon: IconNode, body: () => Solid.JSX.Element): Tabs.Element => {
	return {
		label,
		trigger: () => (
			<>
				<LucideIcon i={lucideIcon} class="size-5" />
				<span class="hidden sm:inline-block">{label}</span>
			</>
		),
		content: () => (
			<div class="p-1">
				<div class="block sm:hidden font-semibold text-lg md:text-xl text-cn-12">{label}</div>
				<div class="mt-2 md:mt-3">{createDynamic(() => body, {})}</div>
			</div>
		),
	};
};

const TABS_ELEMENTS = {
	dependencies: createTab('Dependencies', Network, TabDependencies),
	downloads: createTab('Downloads', LineChart, TabDownloads),
};

const TABS_ELEMENTS_VALUES = Object.keys(TABS_ELEMENTS) as TabsValue[];
const FALLBACK_TABS_VALUE = TABS_ELEMENTS_VALUES[0];

const validTabsValue = (value: unknown): TabsValue => (typeof value === 'string' && TABS_ELEMENTS_VALUES.includes(value as TabsValue) ? (value as TabsValue) : FALLBACK_TABS_VALUE);

export const DetailTabs = () => {
	type RawParams = {
		tab?: string;
	};
	const [searchParams, setSearchParams] = useSearchParams<RawParams>();

	return (
		<Tabs
			elements={TABS_ELEMENTS}
			value={validTabsValue(searchParams.tab)}
			onChange={(tab) => {
				setSearchParams({ tab } satisfies RawParams, { replace: true });
			}}
		/>
	);
};
