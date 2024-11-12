import { clientOnly } from '@solidjs/start';
import { ErrorBoundary, Show, Suspense } from 'solid-js';

import { Separator } from '~/components/ui';
import { usePackageContext } from '~/contexts/package-context';

import { NPMPackageLinks } from '../package-links';
import { NPMSettings } from '../settings';
import { NPMShare } from '../share/share';

const Chart = clientOnly(() => import('./chart'), { lazy: true });

export const NPMPackageDownloads = () => {
	const pkg = usePackageContext();

	return (
		<div class="relative flex flex-col mx-0 sm:mx-5 md:mx-10 px-5 py-4 md:px-8 md:py-6 2xl:px-10 2xl:py-8 w-full max-w-[60rem] min-h-dvh sm:min-h-fit bg-cn-2 border border-transparent md:border-cn-6 rounded-none sm:rounded-3xl shadow">
			<div class="hidden md:block absolute -top-10 -left-6 w-px h-96 bg-gradient-to-b from-cn-3 to-transparent" />
			<div class="hidden md:block absolute -top-10 -right-6 w-px h-96 bg-gradient-to-b from-cn-3 to-transparent" />
			<div class="hidden md:block absolute -top-6 -left-10 -right-10 h-px bg-cn-3" />

			<div class="shrink-0 flex gap-5 md:gap-10 xl:gap-14">
				<div class="grow overflow-hidden">
					<div class="flex items-center gap-4 md:gap-6 mb-1.5 overflow-hidden">
						<h1 class="lg:mb-2 font-bold text-[1.4rem] lg:text-[1.7rem] text-cn-12 truncate">{pkg.name}</h1>
						<NPMPackageLinks class="shrink-0 flex items-center gap-1 md:gap-1.5" />
					</div>
					<Show when={pkg.description}>{(description) => <p class="mb-0.5 pl-0.5 w-full font-normal text-sm lg:text-base text-cn-11 line-clamp-3">{description()}</p>}</Show>
				</div>

				<div class="shrink-0 self-baseline flex items-center gap-1.5 md:gap-2.5">
					<NPMShare />
					<NPMSettings />
				</div>
			</div>

			<Separator class="my-1 md:my-2" />

			<div class="grow mt-1 lg:mt-2">
				<div class="min-h-24">
					<ErrorBoundary
						fallback={(error) => {
							if (__DEV__) console.error(error);
							return (
								<div class="flex items-center justify-center font-medium text-xl aspect-[2/1]">
									<div>Error while loading chart</div>
								</div>
							);
						}}
					>
						<Suspense
							fallback={
								<div class="flex flex-col gap-0.5 md:gap-1">
									<div class="shrink-0 flex justify-between gap-3 md:gap-4 px-2 md:px-3">
										<div class="flex flex-col gap-1 md:gap-1.5 animate-pulse">
											<div class="mt-0.5 md:mt-1 w-36 h-5 bg-cn-4 rounded-lg" />
											<div class="w-20 h-3 bg-cn-3 rounded-lg" />
										</div>
										<div class="flex items-center gap-1.5 md:gap-2.5 animate-pulse">
											<div class="size-10 bg-cn-3 rounded-lg" />
											<div class="size-10 bg-cn-3 rounded-lg" />
										</div>
									</div>
									<div class="grow">
										<div class="p-3 md:p-4 xl:p-5 w-full aspect-[2/1] animate-pulse">
											<div class="relative size-full">
												<div class="absolute top-1/3 left-0 w-full h-px bg-cn-4 rounded" />
												<div class="absolute top-2/3 left-0 w-full h-px bg-cn-4 rounded" />

												<div class="absolute bottom-2 left-0 w-full h-0.5 bg-cn-6 rounded" />
												<div class="absolute top-0 left-2 w-0.5 h-full bg-cn-6 rounded" />

												<div class="absolute h-px bg-cp-9 rounded -rotate-[15deg]" style={{ top: '40%', left: '15%', width: '60%' }} />
												<div class="absolute h-px bg-cp-9 rounded -rotate-[21deg]" style={{ top: '60%', left: '65%', width: '30%' }} />
											</div>
										</div>
									</div>
								</div>
							}
						>
							<Chart />
						</Suspense>
					</ErrorBoundary>
				</div>
			</div>
		</div>
	);
};
