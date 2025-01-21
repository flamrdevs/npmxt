import type { TPackageNameSchema } from './../../schema';

type PackageDownloadsRecordData = {
	name: TPackageNameSchema;
	start: string;
	end: string;
	record: Record<string, number>;
};

export type PackageAllDownloadsRecordData = PackageDownloadsRecordData;
