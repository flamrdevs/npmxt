import { createMemo, createUniqueId } from 'solid-js';

import * as clipboard from '@zag-js/clipboard';
import { normalizeProps, useMachine } from '@zag-js/solid';

import { Check, Copy } from 'lucide';

import { LucideIcon } from '~/components/icons';

import { usePackageContext } from '~/contexts/package-context';

import { NPMXT } from '~/utils/url';

const Items = (props: Solid.ParentProps) => <div class="flex flex-col gap-2 md:gap-3 p-0.5">{props.children}</div>;

const Item = (props: { label: string; pathname: string }) => {
	const [state, send] = useMachine(
		clipboard.machine({
			id: createUniqueId(),
			value: `${NPMXT}${props.pathname}`,
		})
	);

	const api = createMemo(() => clipboard.connect(state, send, normalizeProps));

	return (
		<div {...api().getRootProps()}>
			<label {...api().getLabelProps()} class="block mb-1 md:mb-2 font-medium text-sm text-cn-11">
				{props.label}
			</label>
			<div class="p-0.5">
				<div {...api().getControlProps()} class="flex items-center gap-1 p-1.5 h-10 bg-cn-1 border border-cn-3">
					<input {...api().getInputProps()} disabled class="grow px-2 h-8 bg-transparent font-medium text-sm text-cn-11" />
					<button
						{...api().getTriggerProps()}
						class="shrink-0 appearance-none inline-flex items-center justify-center rounded-md outline-none focus:outline-1 cursor-pointer bg-transparent hover:bg-cn-2 focus:outline-cn-9 size-6 mr-0.5 p-1 font-medium text-base"
					>
						<LucideIcon i={api().copied ? Check : Copy} class={clsx('size-3.5', api().copied ? 'text-cs-11' : 'text-cn-11')} />
					</button>
				</div>
				<div class="p-4 sm:p-5 md:p-6 w-full bg-white dark:bg-black border border-cn-3">
					<img src={props.pathname} aria-label={props.label} />
				</div>
			</div>
		</div>
	);
};

export const TabSVGService = () => {
	const pkg = usePackageContext();

	return (
		<div class="flex flex-col gap-4 md:gap-6 w-full max-w-2xl">
			<div>
				<div class="mb-1 md:mb-2 font-medium text-base text-cn-12">Badge</div>

				<Items>
					<Item label="Last year downloads" pathname={`/badge/dy/${pkg.name}`} />
				</Items>
			</div>

			<div>
				<div class="mb-1 md:mb-2 font-medium text-base text-cn-12">Chart</div>

				<Items>
					<Item label="Last year downloads" pathname={`/chart/dy/${pkg.name}`} />
				</Items>
			</div>
		</div>
	);
};
