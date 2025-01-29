import { clientOnly } from '@solidjs/start';

const Client = clientOnly(() => import('./packages.client'), { lazy: true });

export const NPMPackages = () => {
	return <Client />;
};
