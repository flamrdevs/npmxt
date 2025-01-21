import { ofetch } from 'ofetch';

import type { TPackageNameSchema } from '~/npm/schema';

import { NPMXT } from '~/utils/url';

import type { PackageCreationData } from './types';

export const fetchPackageCreation = (validPackageName: TPackageNameSchema) => ofetch<PackageCreationData>(`${NPMXT}/api/package-creation/${validPackageName}`);
