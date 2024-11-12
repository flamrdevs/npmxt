import { clientOnly } from '@solidjs/start';
import { Suspense } from 'solid-js';

import { usePackageContext } from '~/contexts/package-context';

const PublishedTime = clientOnly(() => import('./published-time.client'), { lazy: true });

export const DetailVersion = () => {
	const pkg = usePackageContext();

	return (
		<div class="flex items-center gap-3 md:gap-4 font-normal">
			<p class="text-sm lg:text-base text-cn-10">v{pkg.version}</p>
			<Suspense fallback={<span class="w-16 h-4 bg-cn-3 rounded animate-pulse" />}>
				<PublishedTime />
			</Suspense>
		</div>
	);
};
