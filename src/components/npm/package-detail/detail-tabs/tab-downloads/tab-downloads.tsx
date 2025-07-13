import { For, Suspense } from 'solid-js';
import { clientOnly } from '@solidjs/start';

import { Separator } from '~/components/ui';

const Client = clientOnly(() => import('./tab-downloads.client'), { lazy: true });

export const TabDownloads = () => {
	return (
		<div>
			<Suspense
				fallback={
					<div class="flex flex-col gap-2 md:gap-3 w-full max-w-2xl animate-pulse">
						<For each={[1, 2]}>
							{() => (
								<>
									<div class="flex flex-col gap-1 md:gap-2 p-2.5 md:p-4 xl:p-6">
										<div class="w-20 h-5 bg-cn-3 rounded-md" />
										<div class="w-44 h-8 bg-cn-4 rounded-md" />
										<div class="w-20 h-3 bg-cn-3 rounded-md" />
									</div>
									<Separator />
								</>
							)}
						</For>
					</div>
				}
			>
				<Client />
			</Suspense>
		</div>
	);
};
