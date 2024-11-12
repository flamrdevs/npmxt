import { createAsync, query } from '@solidjs/router';
import { Show } from 'solid-js';

import { ArrowRight } from 'lucide';

import { LucideIcon } from '~/components/icons';

import { usePackageContext } from '~/contexts/package-context';

import { fetchBundleSize } from '~/bundlejs/utils';
import type { TPackageSchema } from '~/npm/schema';

const getPackageBundleSize = query((pkg: TPackageSchema) => fetchBundleSize(pkg), 'package-bundle-size');

export default () => {
	const pkg = usePackageContext();

	const bundleSize = createAsync(() => getPackageBundleSize(pkg));

	return (
		<Show when={bundleSize()} keyed>
			{(bundleSize) => (
				<>
					<div class="flex items-center gap-1.5 md:gap-2 pl-px h-10 cursor-default opacity-70 hover:opacity-100 transition-opacity">
						<div class="text-sm md:text-base text-cn-12 tabular-nums">{bundleSize.size.uncompressedSize}</div>
						<LucideIcon i={ArrowRight} class="size-3 text-cn-10" />
						<div class="text-sm md:text-base text-cn-11 tabular-nums">
							{bundleSize.size.compressedSize} {bundleSize.size.type}
						</div>
					</div>
				</>
			)}
		</Show>
	);
};
