import type { TPackageSchema } from '../schema';

export const packageToFilename = (pkg: TPackageSchema) => pkg.name.replace(/\//g, '__');
