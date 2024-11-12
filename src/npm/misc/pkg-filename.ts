import type { TPackageSchema } from '../schema';

export const packageFilename = (pkg: TPackageSchema) => pkg.name.replace(/\//g, '__');
