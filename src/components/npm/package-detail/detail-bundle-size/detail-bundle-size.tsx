import { clientOnly } from '@solidjs/start';
import { ErrorBoundary, Suspense } from 'solid-js';

import { AlertTriangle, Info } from 'lucide';

import { LucideIcon } from '~/components/icons';
import { Tooltip } from '~/components/ui';

const Client = clientOnly(() => import('./detail-bundle-size.client'), { lazy: true });

export const DetailBundleSize = (props: Solid.JSX.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props}>
			<div class="flex items-center gap-1 md:gap-2 mb-1 md:mb-2 font-medium text-base md:text-lg text-cn-12 cursor-default">
				<span>Bundle size</span>

				<Tooltip
					trigger={(props) => (
						<div {...props} class="size-3.5 bg-cn-3 rounded-full">
							<LucideIcon i={Info} class="size-full" />
						</div>
					)}
					placement="right"
				>
					Bundled without dependencies
				</Tooltip>
			</div>
			<ErrorBoundary
				fallback={
					<div class="flex items-center gap-1.5 md:gap-2 pl-px h-10">
						<div class="size-4">
							<LucideIcon i={AlertTriangle} class="size-full text-ce-10" />
						</div>
						<div class="text-sm text-cn-11">Bundle error</div>
					</div>
				}
			>
				<Suspense
					fallback={
						<div class="flex items-center gap-1.5 md:gap-2 pl-px h-10 animate-pulse">
							<div class="w-16 h-6 bg-cn-4 rounded" />
							<div class="size-1 bg-cn-4 rounded-full" />
							<div class="w-20 h-6 bg-cn-3 rounded" />
						</div>
					}
				>
					<Client />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};
