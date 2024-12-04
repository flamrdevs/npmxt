import { http, HttpResponse, delay } from 'msw';

import { type TDependenciesSchema, type TPackageMetadataSchema, type TPackageNameSchema, type TPackageSchema, parsePackageName } from '~/npm/schema';
import { BASE_URL_REGISTRY as NPM_BASE_URL_REGISTRY } from '~/npm/url';
import { splitPackageNameAndVersion } from '~/npm/utils';

type MockPackageValue = Omit<TPackageSchema, 'name' | 'version'> &
	Pick<TPackageMetadataSchema, 'dist-tags' | 'time'> & {
		versions: TPackageSchema['version'][];
	};

export const MOCK_PACKAGE: Record<TPackageNameSchema, MockPackageValue> = {
	[parsePackageName('@klass/core')]: {
		description: 'Class variant utility',
		time: {
			created: '2022-12-05T02:37:24.005Z',
			'1.0.0': '2022-12-05T02:37:24.005Z',
			'2.0.0': '2023-06-05T02:37:24.005Z',
			'3.0.0': '2023-12-05T02:37:24.005Z',
			'4.0.0-next.0': '2024-06-05T02:37:24.005Z',
			modified: '2024-06-05T02:37:24.005Z',
		},
		'dist-tags': {
			latest: '3.0.0',
			next: '4.0.0-next.0',
		},
		versions: ['1.0.0', '2.0.0', '3.0.0', '4.0.0-next.0'],
		license: 'MIT',
		author: {
			name: 'flamrdevs',
		},
		repository: {
			type: 'git',
			url: 'git+https://github.com/flamrdevs/klass.git',
		},
		dependencies: {
			clsx: '^2.0.0',
		} as TDependenciesSchema,
	},
	[parsePackageName('@kobalte/core')]: {
		description: 'Unstyled components and primitives for building accessible web apps and design systems with SolidJS.',
		time: {
			created: '2023-01-04T20:42:38.052Z',
			'0.1.0': '2023-01-04T20:42:38.052Z',
			'1.0.0': '2024-01-04T20:42:38.052Z',
			modified: '2024-01-04T20:42:38.052Z',
		},
		'dist-tags': {
			latest: '1.0.0',
		},
		versions: ['0.1.0', '1.0.0'],
		license: 'MIT',
		author: {
			name: 'jer3m01',
		},
		repository: {
			url: 'git+https://github.com/kobaltedev/kobalte.git',
			type: 'git',
		},
		dependencies: {
			'@kobalte/utils': '^0.9.1',
			'solid-presence': '^0.1.8',
			'@floating-ui/dom': '^1.5.1',
			'solid-prevent-scroll': '^0.1.4',
			'@internationalized/date': '^3.4.0',
			'@solid-primitives/props': '^3.1.8',
			'@internationalized/number': '^3.2.1',
			'@solid-primitives/resize-observer': '^2.0.26',
		} as TDependenciesSchema,
		peerDependencies: {
			'solid-js': '^1.8.15',
		} as TDependenciesSchema,
		devDependencies: {
			tsup: '7.2.0',
			'@kobalte/tests': '0.6.0',
			'esbuild-plugin-solid': '^0.5.0',
		} as TDependenciesSchema,
	},
	[parsePackageName('@solidjs/meta')]: {
		description: 'Write meta tags to the document head',
		time: {
			created: '2022-07-25T09:42:29.029Z',
			'1.0.0': '2022-07-25T09:42:29.029Z',
			'2.0.0': '2023-07-25T09:42:29.029Z',
			modified: '2023-07-25T09:42:29.029Z',
		},
		'dist-tags': {
			latest: '2.0.0',
		},
		versions: ['1.0.0', '2.0.0'],
		license: 'MIT',
		homepage: 'https://github.com/solidjs/solid-meta#readme',
		author: {
			name: 'Ryan Carniato',
		},
		repository: {
			type: 'git',
			url: 'git+https://github.com/solidjs/solid-meta.git',
		},
		peerDependencies: {
			'solid-js': '>=1.8.4',
		} as TDependenciesSchema,
		devDependencies: {
			'@babel/cli': '^7.14.3',
			'@babel/core': '7.14.3',
			'@babel/preset-env': '7.14.4',
			'@babel/preset-typescript': '7.13.0',
			'@types/jest': '^26.0.23',
			'babel-preset-solid': '^1.8.4',
			jest: '^26.6.3',
			rimraf: '^3.0.2',
			'solid-jest': '0.1.1',
			'solid-js': '^1.8.4',
			typescript: '4.9.4',
		} as TDependenciesSchema,
	},
	[parsePackageName('@solidjs/router')]: {
		description: 'Universal router for SolidJS',
		time: {
			created: '2022-07-27T09:39:02.620Z',
			'1.0.0': '2022-07-27T09:39:02.620Z',
			'2.0.0': '2023-07-27T09:39:02.620Z',
			modified: '2023-07-27T09:39:02.620Z',
		},
		'dist-tags': {
			latest: '2.0.0',
		},
		versions: ['1.0.0', '2.0.0'],
		license: 'MIT',
		homepage: 'https://github.com/solidjs/solid-router#readme',
		author: {
			name: 'Ryan Carniato',
		},
		repository: {
			type: 'git',
			url: 'git+https://github.com/solidjs/solid-router.git',
		},
		peerDependencies: {
			'solid-js': '^1.8.6',
		} as TDependenciesSchema,
		devDependencies: {
			'@babel/core': '^7.23.9',
			'@babel/preset-typescript': '^7.23.3',
			'@changesets/cli': '^2.27.1',
			'@rollup/plugin-babel': '6.0.4',
			'@rollup/plugin-node-resolve': '15.2.3',
			'@rollup/plugin-terser': '0.4.4',
			'@types/jest': '^29.5.11',
			'@types/node': '^20.11.14',
			'babel-preset-solid': '^1.9.2',
			jsdom: '^24.0.0',
			prettier: '^2.7.0',
			rollup: '^4.9.6',
			'solid-js': '^1.9.2',
			typescript: '^5.3.3',
			vite: '^5.4.8',
			'vite-plugin-solid': '^2.9.1',
			vitest: '^2.1.2',
		} as TDependenciesSchema,
	},
	[parsePackageName('@solidjs/start')]: {
		description: 'This is the SolidStart framework and CLI.',
		time: {
			created: '2023-11-15T18:27:01.709Z',
			'1.0.0': '2023-11-15T18:27:01.709Z',
			'2.0.0': '2024-07-15T18:27:01.709Z',
			modified: '2024-07-15T18:27:01.709Z',
		},
		'dist-tags': {
			latest: '2.0.0',
		},
		versions: ['1.0.0', '2.0.0'],
		license: 'MIT',
		homepage: 'https://start.solidjs.com',
		author: {
			name: 'Ryan Carniato',
		},
		repository: {
			type: 'git',
			url: 'git+https://github.com/solidjs/solid-start.git',
		},
		dependencies: {
			'@vinxi/plugin-directives': '^0.4.3',
			'@vinxi/server-components': '^0.4.3',
			'@vinxi/server-functions': '^0.4.3',
			defu: '^6.1.2',
			'error-stack-parser': '^2.1.4',
			'html-to-image': '^1.11.11',
			radix3: '^1.1.0',
			seroval: '^1.0.2',
			'seroval-plugins': '^1.0.2',
			shikiji: '^0.9.12',
			'source-map-js': '^1.0.2',
			terracotta: '^1.0.4',
			tinyglobby: '^0.2.2',
			'vite-plugin-solid': '^2.10.2',
		} as TDependenciesSchema,
		devDependencies: {
			'solid-js': '^1.9.2',
			vinxi: '^0.4.3',
			typescript: '^5.4.2',
		} as TDependenciesSchema,
	},
	[parsePackageName('npmxt')]: {
		description: 'npmxt',
		time: {
			created: '2024-11-03T07:14:51.355Z',
			'0.0.0': '2024-11-03T07:14:51.355Z',
			modified: '2024-11-03T07:14:51.355Z',
		},
		'dist-tags': {
			latest: '0.0.0',
		},
		versions: ['0.0.0'],
	},
	[parsePackageName('react')]: {
		description: 'React is a JavaScript library for building user interfaces.',
		time: {
			created: '2011-10-26T17:46:21.942Z',
			'17.0.0': '2011-10-26T17:46:21.942Z',
			'18.0.0': '2014-10-26T17:46:21.942Z',
			'19.0.0-canary.0': '2017-10-26T17:46:21.942Z',
			modified: '2017-10-26T17:46:21.942Z',
		},
		'dist-tags': {
			latest: '18.0.0',
			canary: '19.0.0-canary.0',
		},
		versions: ['17.0.0', '18.0.0', '19.0.0-canary.0'],
		license: 'MIT',
		homepage: 'https://react.dev',
		repository: {
			url: 'git+https://github.com/facebook/react.git',
			type: 'git',
		},
		dependencies: {
			'loose-envify': '^1.1.0',
		} as TDependenciesSchema,
	},
	[parsePackageName('react-dom')]: {
		description: 'React package for working with the DOM.',
		time: {
			created: '2014-05-06T18:59:36.160Z',
			'17.0.0': '2014-05-06T18:59:36.160Z',
			'18.0.0': '2015-05-06T18:59:36.160Z',
			'19.0.0-canary.0': '2016-05-06T18:59:36.160Z',
			modified: '2016-05-06T18:59:36.160Z',
		},
		'dist-tags': {
			latest: '18.0.0',
			canary: '19.0.0-canary.0',
		},
		versions: ['17.0.0', '18.0.0', '19.0.0-canary.0'],
		license: 'MIT',
		homepage: 'https://react.dev',
		repository: {
			url: 'git+https://github.com/facebook/react.git',
			type: 'git',
		},
		dependencies: {
			scheduler: '^0.23.2',
			'loose-envify': '^1.1.0',
		} as TDependenciesSchema,
		peerDependencies: {
			react: '^18.3.1',
		} as TDependenciesSchema,
	},
	[parsePackageName('solid-js')]: {
		description: 'A declarative JavaScript library for building user interfaces.',
		time: {
			created: '2018-04-25T04:09:31.206Z',
			'1.0.0': '2018-04-25T04:09:31.206Z',
			'1.1.0': '2018-08-25T04:09:31.206Z',
			'1.2.0': '2019-04-25T04:09:31.206Z',
			'1.3.0': '2019-08-25T04:09:31.206Z',
			'1.4.0': '2020-04-25T04:09:31.206Z',
			'1.5.0': '2020-08-25T04:09:31.206Z',
			'1.6.0': '2021-04-25T04:09:31.206Z',
			'1.7.0': '2021-08-25T04:09:31.206Z',
			'1.8.0': '2022-04-25T04:09:31.206Z',
			'2.0.0': '2023-04-25T04:09:31.206Z',
			modified: '2023-04-25T04:09:31.206Z',
		},
		'dist-tags': {
			latest: '2.0.0',
		},
		versions: ['1.0.0', '1.1.0', '1.2.0', '1.3.0', '1.4.0', '1.5.0', '1.6.0', '1.7.0', '1.8.0', '2.0.0'],
		license: 'MIT',
		homepage: 'https://solidjs.com',
		author: {
			name: 'Ryan Carniato',
		},
		repository: {
			type: 'git',
			url: 'git+https://github.com/solidjs/solid.git',
		},
		dependencies: {
			csstype: '^3.1.0',
			seroval: '^1.1.0',
			'seroval-plugins': '^1.1.0',
		} as TDependenciesSchema,
	},
	[parsePackageName('svelte')]: {
		description: 'Cybernetically enhanced web apps',
		time: {
			created: '2016-11-17T22:58:41.644Z',
			'3.0.0': '2016-11-17T22:58:41.644Z',
			'4.0.0': '2019-11-17T22:58:41.644Z',
			'5.0.0': '2023-11-17T22:58:41.644Z',
			modified: '2023-11-17T22:58:41.644Z',
		},
		'dist-tags': {
			latest: '5.0.0',
		},
		versions: ['3.0.0', '4.0.0', '5.0.0'],
		license: 'MIT',
		homepage: 'https://svelte.dev',
		repository: {
			type: 'git',
			url: 'git+https://github.com/sveltejs/svelte.git',
		},
		dependencies: {
			'@ampproject/remapping': '^2.3.0',
			'@jridgewell/sourcemap-codec': '^1.5.0',
			'@types/estree': '^1.0.5',
			acorn: '^8.12.1',
			'acorn-typescript': '^1.4.13',
			'aria-query': '^5.3.1',
			'axobject-query': '^4.1.0',
			'esm-env': '^1.0.0',
			esrap: '^1.2.2',
			'is-reference': '^3.0.2',
			'locate-character': '^3.0.0',
			'magic-string': '^0.30.11',
			zimmerframe: '^1.1.2',
		} as TDependenciesSchema,
		devDependencies: {
			'@jridgewell/trace-mapping': '^0.3.25',
			'@playwright/test': '^1.46.1',
			'@rollup/plugin-commonjs': '^28.0.0',
			'@rollup/plugin-node-resolve': '^15.3.0',
			'@rollup/plugin-terser': '^0.4.4',
			'@rollup/plugin-virtual': '^3.0.2',
			'@types/aria-query': '^5.0.4',
			'@types/node': '^20.11.5',
			'dts-buddy': '^0.5.3',
			esbuild: '^0.21.5',
			rollup: '^4.22.4',
			'source-map': '^0.7.4',
			'tiny-glob': '^0.2.9',
			typescript: '^5.5.4',
			vitest: '^2.0.5',
		} as TDependenciesSchema,
	},
	[parsePackageName('vue')]: {
		description: 'The progressive JavaScript framework for building modern web UI.',
		time: {
			created: '2013-12-07T06:09:46.299Z',
			'2.0.0': '2013-12-07T06:09:46.299Z',
			'3.0.0': '2018-12-07T06:09:46.299Z',
			modified: '2018-12-07T06:09:46.299Z',
		},
		'dist-tags': {
			latest: '3.0.0',
		},
		versions: ['2.0.0', '3.0.0'],
		license: 'MIT',
		homepage: 'https://github.com/vuejs/core/tree/main/packages/vue#readme',
		author: {
			name: 'Evan You',
		},
		repository: {
			type: 'git',
			url: 'git+https://github.com/vuejs/core.git',
		},
		dependencies: {
			'@vue/shared': '3.5.12',
			'@vue/compiler-dom': '3.5.12',
			'@vue/compiler-sfc': '3.5.12',
			'@vue/runtime-dom': '3.5.12',
			'@vue/server-renderer': '3.5.12',
		} as TDependenciesSchema,
		peerDependencies: {
			typescript: '*',
		} as TDependenciesSchema,
	},
	[parsePackageName('looooooooo-oooooooo-oooooooooooooooong')]: {
		description: 'maybe looooooooo-oooooooo-oooooooooooooooong description',
		time: {
			created: '2011-01-01T01:01:01.001Z',
			'100.100.100': '2011-01-01T01:01:01.001Z',
			modified: '2011-01-01T01:01:01.001Z',
		},
		'dist-tags': {
			latest: '100.100.100',
		},
		versions: ['100.100.100'],
		license: 'LICENSE',
		homepage: 'https://loooooooooooooooooooooooooooooong.dev/pathname/path/path/path/path/path/path/path/path/path/path/path/path/path',
		author: {
			name: 'Loooo Oooo Ong Developer',
		},
		dependencies: {
			'@looooooooo/oooooooooooo-oooooooooooooooooooooooong': '10000.10000.10000',
		} as TDependenciesSchema,
	},
	[parsePackageName('@looooooooo/oooooooooooo-oooooooooooooooooooooooong')]: {
		description: 'maybe @looooooooo/oooooooooooo-oooooooooooooooooooooooong description and description and description and description and description and description',
		time: {
			created: '2011-01-01T01:01:01.001Z',
			'10000.10000.10000': '2011-01-01T01:01:01.001Z',
			modified: '2011-01-01T01:01:01.001Z',
		},
		'dist-tags': {
			latest: '10000.10000.10000',
		},
		versions: ['10000.10000.10000'],
		license: 'LOOOOOOOOONG LICENSE',
		homepage: 'https://loooooooooooooooooooooooooooooong.dev/pathname/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path',
		author: {
			name: 'Loooo Oooo Ong Developer',
		},
	},
};

export default [
	http.get<{ 0: string }>(`${NPM_BASE_URL_REGISTRY}/*`, async ({ params }) => {
		if (__MSW_DELAY__) await delay(1000);

		const [tName, tVersion] = splitPackageNameAndVersion(params['0']);

		if (tName in MOCK_PACKAGE) {
			const name = tName as TPackageNameSchema;
			if (tVersion) {
				const pkg = MOCK_PACKAGE[name];
				const { 'dist-tags': distTags } = pkg;
				let version: string | undefined;
				if (tVersion in distTags) version = distTags[tVersion];
				else if (pkg.versions.includes(tVersion)) version = tVersion;

				if (version)
					return HttpResponse.json(
						{
							name,
							version,
							...pkg,
						} satisfies TPackageSchema,
						{ status: 200 }
					);
			} else {
				const { time } = MOCK_PACKAGE[name];
				const { versions, 'dist-tags': distTags } = MOCK_PACKAGE[name];

				return HttpResponse.json(
					{
						name,
						time,
						versions,
						'dist-tags': distTags,
					} satisfies TPackageMetadataSchema,
					{ status: 200 }
				);
			}
		}

		throw HttpResponse.json({ error: 'not_found' }, { status: 404 });
	}),
];
