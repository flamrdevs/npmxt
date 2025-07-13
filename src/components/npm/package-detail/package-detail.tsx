import { Show } from 'solid-js';

import { Separator } from '~/components/ui';
import { usePackageContext } from '~/contexts/package-context';

import { NPMPackageLinks } from '../package-links';
import { NPMSettings } from '../settings';
import { NPMShare } from '../share/share';

import { NPMFavorite } from '../favorite';
import { DetailBundleSize } from './detail-bundle-size/detail-bundle-size';
import { DetailInstall } from './detail-install/detail-install';
import { DetailTabs } from './detail-tabs/detail-tabs';
import { DetailVersion } from './detail-version/detail-version';

export const NPMPackageDetail = () => {
	const pkg = usePackageContext();

	return (
		<div class="relative flex flex-col mx-0 sm:mx-5 md:mx-10 px-5 py-4 md:px-8 md:py-6 2xl:px-10 2xl:py-8 w-full max-w-[60rem] min-h-dvh sm:min-h-fit bg-cn-2 border border-transparent md:border-cn-6 rounded-none sm:rounded-3xl shadow-sm">
			<div class="hidden md:block absolute -top-10 -left-6 w-px h-96 bg-gradient-to-b from-cn-3 to-transparent" />
			<div class="hidden md:block absolute -top-10 -right-6 w-px h-96 bg-gradient-to-b from-cn-3 to-transparent" />
			<div class="hidden md:block absolute -top-6 -left-10 -right-10 h-px bg-cn-3" />

			<div class="shrink-0 flex gap-5 md:gap-10 xl:gap-14">
				<div class="grow overflow-hidden">
					<div class="flex items-center gap-4 md:gap-6 mb-1 overflow-hidden">
						<h1 class="lg:mb-2 font-bold text-[1.4rem] lg:text-[1.7rem] text-cn-12 truncate">{pkg.name}</h1>
						<NPMPackageLinks class="shrink-0 flex items-center gap-1 md:gap-1.5" />
					</div>
					<div class="mb-1 pl-0.5 w-fit">
						<DetailVersion />
					</div>
					<Show when={pkg.description}>{(description) => <p class="mb-0.5 pl-0.5 w-full font-normal text-sm lg:text-base text-cn-11 line-clamp-3">{description()}</p>}</Show>
				</div>

				<div class="shrink-0 self-baseline flex items-center gap-1.5 md:gap-2.5">
					<NPMFavorite />
					<NPMShare />
					<NPMSettings />
				</div>
			</div>

			<Separator class="my-1 md:my-2" />

			<div class="shrink-0 flex flex-col md:flex-row items-stretch gap-4 md:gap-5 2xl:gap-7 mt-1 lg:mt-2">
				<DetailInstall class="shrink-0 w-full md:w-fit md:min-w-[50%] md:max-w-[70%]" />
				<DetailBundleSize class="shrink-0 w-full md:w-fit md:max-w-[30%]" />
			</div>

			<div class="grow mt-4 lg:mt-6 min-h-24">
				<DetailTabs />
			</div>
		</div>
	);
};
