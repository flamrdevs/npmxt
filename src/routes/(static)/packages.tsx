import { Suspense } from 'solid-js';
import { clientOnly } from '@solidjs/start';

const PackagesAppClient = clientOnly(() => import('~/components/routes/packages/app.client'), { lazy: true });

export default function PackagesPage() {
	return (
		<Suspense>
			<PackagesAppClient />
		</Suspense>
	);
}
