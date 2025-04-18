import * as v from 'valibot';

const StringSchema = v.string();
const NumberSchema = v.number();
const OptionalStringSchema = v.optional(StringSchema);

const PACKAGE_NAME_REGEXP = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
export type TPackageNameSchema = v.InferOutput<typeof PackageNameSchema>;
export const PackageNameSchema = v.pipe(StringSchema, v.trim(), v.regex(PACKAGE_NAME_REGEXP, `${__DEV__ ? '[valibot] ' : ''} Invalid package name format`), v.brand('package-name'));
export const parsePackageName = v.parser(PackageNameSchema);
export const parseCachedPackageName = (() => {
	const cache: Record<string, TPackageNameSchema> = {};
	return (input: string) => (cache[input] ||= parsePackageName(input));
})();

export type TPackageMetadataSchema = v.InferOutput<typeof PackageMetadataSchema>;
export const PackageMetadataSchema = v.object({
	name: PackageNameSchema,
	time: v.looseObject({
		created: StringSchema,
		modified: StringSchema,
	}),
	versions: v.pipe(
		v.record(StringSchema, v.any()),
		v.transform((input) => Object.keys(input))
	),
	'dist-tags': v.record(StringSchema, StringSchema),
});
export const parsePackageMetadata = v.parser(PackageMetadataSchema);
export const safeParsePackageMetadata = v.safeParser(PackageMetadataSchema);

export type TDependenciesSchema = v.InferOutput<typeof DependenciesSchema>;
export const DependenciesSchema = v.optional(v.record(PackageNameSchema, StringSchema));

export type TPackageSchema = v.InferOutput<typeof PackageSchema>;
export const PackageSchema = v.object({
	name: PackageNameSchema,
	version: StringSchema,
	description: OptionalStringSchema,
	license: v.optional(
		v.union([
			StringSchema,
			v.object({
				type: OptionalStringSchema,
			}),
		])
	),
	homepage: OptionalStringSchema,
	author: v.optional(
		v.union([
			StringSchema,
			v.object({
				name: OptionalStringSchema,
			}),
		])
	),
	repository: v.optional(
		v.union([
			StringSchema,
			v.object({
				type: OptionalStringSchema,
				url: OptionalStringSchema,
			}),
		])
	),
	dependencies: DependenciesSchema,
	peerDependencies: DependenciesSchema,
	devDependencies: DependenciesSchema,
});
export const parsePackage = v.parser(PackageSchema);
export const safeParsePackage = v.safeParser(PackageSchema);

export const PACKAGE_DOWNLOADS_LAST_MAP = {
	day: 1,
	week: 7,
	month: 30,
	year: 365,
};
export const PACKAGE_DOWNLOADS_LAST_LIST = Object.keys(PACKAGE_DOWNLOADS_LAST_MAP) as (keyof typeof PACKAGE_DOWNLOADS_LAST_MAP)[];

export type TPackageDownloadsLastSchema = v.InferOutput<typeof PackageDownloadsLastSchema>;
export const PackageDownloadsLastSchema = v.picklist(PACKAGE_DOWNLOADS_LAST_LIST);
export const parsePackageDownloadsLast = v.parser(PackageDownloadsLastSchema);

export type TPackageDownloadsPointSchema = v.InferOutput<typeof PackageDownloadsPointSchema>;
export const PackageDownloadsPointSchema = v.object({
	package: PackageNameSchema,
	start: StringSchema,
	end: StringSchema,
	downloads: NumberSchema,
});
export const parsePackageDownloadsPoint = v.parser(PackageDownloadsPointSchema);
export const safeParsePackageDownloadsPoint = v.safeParser(PackageDownloadsPointSchema);

export type TPackageDownloadsRangeSchema = v.InferOutput<typeof PackageDownloadsRangeSchema>;
export const PackageDownloadsRangeSchema = v.object({
	package: PackageNameSchema,
	start: StringSchema,
	end: StringSchema,
	downloads: v.array(
		v.object({
			downloads: NumberSchema,
			day: StringSchema,
		})
	),
});
export const parsePackageDownloadsRange = v.parser(PackageDownloadsRangeSchema);
export const safeParsePackageDownloadsRange = v.safeParser(PackageDownloadsRangeSchema);
