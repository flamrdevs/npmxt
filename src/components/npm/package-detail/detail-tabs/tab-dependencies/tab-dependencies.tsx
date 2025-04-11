import { A, useLocation } from '@solidjs/router';
import { For, createMemo } from 'solid-js';

import * as KLink from '@kobalte/core/link';

import { linkToNPMPackage } from '~/npm/href';
import type { TDependenciesSchema, TPackageNameSchema } from '~/npm/schema';

import * as SVGL from '~/components/icons/svgl';

import { Separator } from '~/components/ui';
import { usePackageContext } from '~/contexts/package-context';

const sortFnDepsEntries = <T extends [string, string]>(a: T, b: T) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0);

const RenderList = (props: { label: string; deps: TDependenciesSchema }) => {
	const location = useLocation();

	const entries = createMemo(() => {
		const deps = props.deps;
		return typeof deps === 'object' && deps !== null ? (Object.entries(deps).toSorted(sortFnDepsEntries) as [TPackageNameSchema, string][]) : [];
	});

	return (
		<div>
			<div class="flex items-center gap-2">
				<span class="font-medium text-base text-cn-12">{props.label}</span>
				<span class="font-medium text-sm text-cn-11">({entries().length})</span>
			</div>
			<ul class="space-y-0.5 md:space-y-1 my-1 md:my-2">
				<For each={entries()}>
					{([name, specifier]) => (
						<li class="group flex items-center justify-between">
							<div class="flex items-center gap-1 md:gap-2 overflow-hidden">
								<KLink.Root as={A} href={`/package/${name}${location.search}`} class="block px-1 text-base text-cn-11 group-hover:text-cn-12 truncate transition-colors">
									{name}
								</KLink.Root>

								<KLink.Root href={linkToNPMPackage(name)} target="_blank" rel="noreferrer" class="opacity-0 group-hover:opacity-100 p-0.5 size-6 hover:bg-cn-3 transition-all">
									<SVGL.NPM class="size-full" />
								</KLink.Root>
							</div>

							<div class="grow px-2 md:px-3">
								<Separator class="hidden group-hover:block" />
							</div>

							<span class="max-w-56 text-sm text-cn-10 group-hover:text-cn-11 truncate transition-colors">{specifier}</span>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
};

export const TabDependencies = () => {
	const pkg = usePackageContext();

	return (
		<div class="flex flex-col gap-2 md:gap-3 w-full max-w-2xl">
			<RenderList label="Dependencies" deps={pkg.dependencies} />
			<Separator />
			<RenderList label="Peer Dependencies" deps={pkg.peerDependencies} />
			<Separator />
			<RenderList label="Dev Dependencies" deps={pkg.devDependencies} />
		</div>
	);
};
