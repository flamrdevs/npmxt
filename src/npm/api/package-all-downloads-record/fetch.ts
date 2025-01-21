import { ofetch } from 'ofetch';

import type { TPackageNameSchema } from '~/npm/schema';

import { NPMXT } from '~/utils/url';

import type { PackageAllDownloadsRecordData } from './types';

export const fetchPackageAllDownloadsRecord = (validPackageName: TPackageNameSchema) => ofetch<PackageAllDownloadsRecordData>(`${NPMXT}/api/package-all-downloads-record/${validPackageName}`);
