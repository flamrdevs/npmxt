import type { TPackageNameSchema } from '~/npm/schema';
import { fetchPackageMetadata } from '~/npm/utils';

import type { PackageCreationData } from './types';

const handlePackageCreationDate = async (validPackageName: TPackageNameSchema): Promise<number> => {
	const {
		time: { created: date },
	} = await fetchPackageMetadata(validPackageName);

	return new Date(date).getTime();
};

export const handlePackageCreation = async (validPackageName: TPackageNameSchema): Promise<PackageCreationData> => ({ date: await handlePackageCreationDate(validPackageName) });
