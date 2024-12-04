import { query } from '@solidjs/router';

import { fetchPackage, fetchPackageAlt } from './utils';

export const queryPackage = query((name: string) => fetchPackage(name), 'package');

export const queryPackageAlt = query((input: string) => fetchPackageAlt(input), 'package-alt');
