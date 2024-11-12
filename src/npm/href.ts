export const linkToNPMPackage = (name: string, version?: string) => `https://www.npmjs.com/package/${name}${version ? `/v/${version}` : ''}`;
