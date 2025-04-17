import * as v from 'valibot';

const StringSchema = v.string();

export type TBundleSizeSchema = v.InferOutput<typeof BundleSizeSchema>;
export const BundleSizeSchema = v.object({
	size: v.object({
		type: StringSchema,
		uncompressedSize: StringSchema,
		compressedSize: StringSchema,
	}),
});
export const parseBundleSize = v.parser(BundleSizeSchema);
export const safeParseBundleSize = v.safeParser(BundleSizeSchema);
