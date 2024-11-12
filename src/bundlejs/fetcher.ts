import { ofetch } from 'ofetch';

import type { TPackageSchema } from '~/npm/schema';

import { BASE_URL_DENO } from './url';

export const fetcherBundleSize = (pkg: TPackageSchema) =>
	ofetch(
		`${BASE_URL_DENO}/?${new URLSearchParams({
			q: `${pkg.name}@${pkg.version}`,
			config: JSON.stringify({
				esbuild: {
					external: Object.keys({
						...pkg.peerDependencies,
						...pkg.dependencies,
					}),
				},
			}),
		})}`
	);
