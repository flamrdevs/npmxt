import { createCacheStorage } from '~/utils/cache-storage';
import { StatusError, isErrorStatusNotFound, isFetchError, isStatusError } from '~/utils/error';

import {
	type TPackageDownloadsPointSchema,
	type TPackageDownloadsRangeSchema,
	type TPackageMetadataSchema,
	type TPackageSchema,
	parseCachedPackageName,
	parsePackage,
	parsePackageDownloadsLast,
	parsePackageDownloadsPoint,
	parsePackageDownloadsRange,
	parsePackageMetadata,
} from './schema';

import { fetcherPackage, fetcherPackageDownloadsPointLast, fetcherPackageDownloadsRangeLast, fetcherPackageMetadata } from './fetcher';

export const splitPackageNameAndVersion = (() => {
	const cache: Record<string, readonly [string, string | undefined]> = {};

	const scoped = (str: string) => str.startsWith('@');

	const fn = (input: string) => {
		const splitted = input.split('/');

		let name: string;
		let version: string | undefined;

		const length = splitted.length;
		if (length === 0) throw new StatusError(`${__DEV__ ? '[splitPackageNameAndVersion] ' : ''}Require package name`, 400);

		if (length === 1) {
			name = splitted[0];
		} else if (length === 2) {
			const [s1, s2] = splitted;
			if (scoped(s1)) {
				name = `${s1}/${s2}`;
			} else {
				name = s1;
				version = s2;
			}
		} else if (length === 3 && scoped(splitted[0])) {
			const [s1, s2, s3] = splitted;
			name = `${s1}/${s2}`;
			version = s3;
		} else {
			throw new StatusError(`${__DEV__ ? '[splitPackageNameAndVersion] ' : ''}Invalid format package name & version`, 400);
		}

		return [name, version] as const;
	};

	return (input: string) => (cache[input] ||= fn(input));
})();

const throwWithPackageNotFoundError = (error: unknown) => {
	if (__DEV__) console.error(error);
	if ((isFetchError(error) || isStatusError(error)) && isErrorStatusNotFound(error)) return new StatusError('Package not found', 404);
	return error;
};

export const fetchPackage = (() => {
	const withCacheStorage = createCacheStorage<TPackageSchema>(__DEV__ ? 'npm:package' : 'npm:pkg');

	return (rawName: string, rawVersion: string | undefined = 'latest'): Promise<TPackageSchema> => {
		const validPackageName = parseCachedPackageName(rawName);
		const validPackageVersion = rawVersion;
		return withCacheStorage(`${validPackageName}@${validPackageVersion}`, async () => {
			try {
				return parsePackage(await fetcherPackage(validPackageName, validPackageVersion));
			} catch (error) {
				throw throwWithPackageNotFoundError(error);
			}
		});
	};
})();

export const fetchPackageAlt = (input: string): Promise<TPackageSchema> => fetchPackage(...splitPackageNameAndVersion(input));

export const fetchPackageMetadata = (() => {
	const withCacheStorage = createCacheStorage<TPackageMetadataSchema>(__DEV__ ? 'npm:package-metadata' : 'npm:pkg-m');

	return (rawName: string): Promise<TPackageMetadataSchema> =>
		withCacheStorage(parseCachedPackageName(rawName), async (validPackageName) => {
			try {
				return parsePackageMetadata(await fetcherPackageMetadata(validPackageName));
			} catch (error) {
				throw throwWithPackageNotFoundError(error);
			}
		});
})();

export const fetchPackageDownloadsPointLast = (() => {
	const withCacheStorage = createCacheStorage<TPackageDownloadsPointSchema>(__DEV__ ? 'npm:package-downloads-point-last' : 'npm:pkg-dp-l');

	return (rawName: string, rawLast: string): Promise<TPackageDownloadsPointSchema> => {
		const validPackageName = parseCachedPackageName(rawName);
		const validLast = parsePackageDownloadsLast(rawLast);
		return withCacheStorage(`${validPackageName}/${validLast}`, async () => {
			try {
				return parsePackageDownloadsPoint(await fetcherPackageDownloadsPointLast(validLast, validPackageName));
			} catch (error) {
				throw throwWithPackageNotFoundError(error);
			}
		});
	};
})();

export const fetchPackageDownloadsRangeLast = (() => {
	const withCacheStorage = createCacheStorage<TPackageDownloadsRangeSchema>(__DEV__ ? 'npm:package-downloads-range-last' : 'npm:pkg-dr-l');

	return (rawName: string, rawLast: string): Promise<TPackageDownloadsRangeSchema> => {
		const validPackageName = parseCachedPackageName(rawName);
		const validLast = parsePackageDownloadsLast(rawLast);
		return withCacheStorage(`${validPackageName}/${validLast}`, async () => {
			try {
				return parsePackageDownloadsRange(await fetcherPackageDownloadsRangeLast(validLast, validPackageName));
			} catch (error) {
				throw throwWithPackageNotFoundError(error);
			}
		});
	};
})();
