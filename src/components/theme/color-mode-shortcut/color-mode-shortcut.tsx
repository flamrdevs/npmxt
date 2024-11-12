import { clientOnly } from '@solidjs/start';
import { Suspense } from 'solid-js';

export const Client = clientOnly(() => import('./color-mode-shortcut.client'), { lazy: true });

export const ColorModeShortcut = () => (
	<Suspense>
		<Client />
	</Suspense>
);
