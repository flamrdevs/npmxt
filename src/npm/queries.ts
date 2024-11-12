import { query } from '@solidjs/router';

import { fetchPackage, fetchPackageAlt } from './utils';

export const queryPackage = query((name: string) => fetchPackage(name), 'package');

export const queryPackageAlt = query((name: string) => fetchPackageAlt(name), 'package-alt');
