import { clientOnly } from '@solidjs/start';
import { Suspense } from 'solid-js';

const PackagesAppClient = clientOnly(() => import('~/components/routes/packages/app.client'), { lazy: true });

export default function PackagesPage() {
	return (
		<Suspense>
			<PackagesAppClient />
		</Suspense>
	);
}
