import { createEffect, createMemo, createUniqueId } from 'solid-js';
import { createDynamic } from 'solid-js/web';
import { useSearchParams } from '@solidjs/router';

import * as KSelect from '@kobalte/core/select';
import * as zagClipboard from '@zag-js/clipboard';
import * as zag from '@zag-js/solid';
import { clsx } from 'clsx';
import { Check, ChevronDown, Copy } from 'lucide';

import { LucideIcon } from '~/components/icons';
import * as SVGL from '~/components/icons/svgl';
import { usePackageContext } from '~/contexts/package-context';

const css = {
	sl: 'shrink-0 h-7',
	'sl-t': 'appearance-none inline-flex items-center justify-between gap-2 rounded-md focus:outline-1 cursor-pointer bg-cn-2 focus:outline-cn-9 h-full px-3 font-medium text-base',
	'sl-c': 'relative z-50 bg-cn-2/90 backdrop-blur-sm border border-cn-5 rounded-md outline-hidden shadow-2xl shadow-black-2',
	'sl-i':
		'relative flex items-center justify-between w-32 h-7 px-3 bg-transparent text-cn-11 font-normal text-base rounded-sm outline-hidden select-none data-[selected]:text-cn-12 data-[highlighted]:bg-cn-4',
};

type PackageManager = keyof typeof PACKAGE_MANAGER;
const PACKAGE_MANAGER = {
	npm: 'npm install ',
	yarn: 'yarn add ',
	pnpm: 'pnpm add ',
	bun: 'bun add ',
	deno: 'deno install npm:',
};

const FALLBACK_PACKAGE_MANAGER: PackageManager = 'npm';

type SelectOption = {
	value: PackageManager;
	icon: Solid.Component<any>;
};

const SELECT_OPTION = {
	npm: {
		value: 'npm',
		icon: SVGL.NPM,
	},
	yarn: {
		value: 'yarn',
		icon: SVGL.Yarn,
	},
	pnpm: {
		value: 'pnpm',
		icon: SVGL.PNPM,
	},
	bun: {
		value: 'bun',
		icon: SVGL.Bun,
	},
	deno: {
		value: 'deno',
		icon: SVGL.Deno,
	},
} satisfies Record<PackageManager, SelectOption>;

const SELECT_OPTIONS: SelectOption[] = Object.values(SELECT_OPTION);

const selectItemComponent = (props: KSelect.SelectRootItemComponentProps<SelectOption>) => (
	<KSelect.Item item={props.item} class={css['sl-i']}>
		<div class="shrink-0 w-7">{createDynamic(() => props.item.rawValue.icon, {})}</div>
		<KSelect.ItemLabel class="grow text-sm">{props.item.rawValue.value}</KSelect.ItemLabel>
		<KSelect.ItemIndicator class="shrink-0 size-3.5 text-cn-11">
			<LucideIcon i={Check} class="size-full" />
		</KSelect.ItemIndicator>
	</KSelect.Item>
);

export const DetailInstall = (props: Solid.JSX.HTMLAttributes<HTMLDivElement>) => {
	const pkg = usePackageContext();

	type RawParams = {
		pm?: string;
	};
	const [searchParams, setSearchParams] = useSearchParams<RawParams>();

	const packageManager = createMemo(() => {
		const pm = searchParams.pm;

		return SELECT_OPTION[typeof pm === 'string' && pm in PACKAGE_MANAGER ? (pm as PackageManager) : FALLBACK_PACKAGE_MANAGER];
	});

	const commandValue = createMemo(() => `${PACKAGE_MANAGER[packageManager().value]}${pkg.name}`);

	const serviceClipboard = zag.useMachine(zagClipboard.machine, {
		id: createUniqueId(),
		defaultValue: commandValue(),
	});

	const apiClipboard = createMemo(() => zagClipboard.connect(serviceClipboard, zag.normalizeProps));

	createEffect(() => {
		apiClipboard().setValue(commandValue());
	});

	const command = createMemo(() => {
		const [s1, s2, s3] = commandValue().split(' ');

		return (
			<>
				<span class="text-cp-10">{s1}</span>
				&nbsp;
				<span class="text-cn-10">{s2}</span>
				&nbsp;
				<span class="text-cn-11 truncate overflow-hidden">{s3}</span>
			</>
		);
	}) as unknown as Solid.JSX.Element;

	return (
		<div {...props} {...apiClipboard().getRootProps()}>
			<label {...apiClipboard().getLabelProps()} class="block mb-1 md:mb-2 font-medium text-base md:text-lg text-cn-12">
				Install
			</label>
			<div {...apiClipboard().getControlProps()} class="flex items-center justify-center gap-1 p-1.5 h-10 bg-cn-1 border border-cn-5 rounded-xl">
				<KSelect.Root
					options={SELECT_OPTIONS}
					optionValue="value"
					optionTextValue="value"
					itemComponent={selectItemComponent}
					value={packageManager()}
					onChange={(value) => {
						if (value) setSearchParams({ pm: value.value } satisfies RawParams, { replace: true });
					}}
					class={css['sl']}
					placement="bottom-start"
				>
					<KSelect.Trigger class={css['sl-t']} aria-label="Select package manager">
						<KSelect.Value<SelectOption>>{(state) => createDynamic(() => state.selectedOption().icon, { class: 'h-full' })}</KSelect.Value>
						<KSelect.Icon class="size-3.5 text-cn-11">
							<LucideIcon i={ChevronDown} class="size-full" />
						</KSelect.Icon>
					</KSelect.Trigger>
					<KSelect.Portal>
						<KSelect.Content class={css['sl-c']}>
							<KSelect.Listbox class="outline-hidden p-1" />
						</KSelect.Content>
					</KSelect.Portal>
				</KSelect.Root>

				<span class="grow inline-flex items-center justify-start outline-hidden text-cn-11 h-8 px-2 font-medium text-sm select-none overflow-hidden">{command}</span>

				<button
					{...apiClipboard().getTriggerProps()}
					class="shrink-0 appearance-none inline-flex items-center justify-center rounded-md focus:outline-1 cursor-pointer bg-transparent hover:bg-cn-2 focus:outline-cn-9 size-6 mr-0.5 p-1 font-medium text-base"
				>
					<LucideIcon i={apiClipboard().copied ? Check : Copy} class={clsx('size-3.5', apiClipboard().copied ? 'text-cs-11' : 'text-cn-11')} />
				</button>
			</div>
		</div>
	);
};
