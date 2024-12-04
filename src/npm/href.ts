import type { TPackageNameSchema } from './schema';

export const linkToNPMPackage = (name: TPackageNameSchema, version?: string) => `https://www.npmjs.com/package/${name}${version ? `/v/${version}` : ''}`;
