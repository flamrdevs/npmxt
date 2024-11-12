import { query } from '@solidjs/router';

import { fetchPackageMetadata } from './utils';

export const queryPackageMetadata = query((name: string) => fetchPackageMetadata(name), 'package-metadata');
