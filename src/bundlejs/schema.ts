import * as v from 'valibot';

import { createParser } from '~/utils/valibot';

const StringSchema = v.string();

export type TBundleSizeSchema = v.InferOutput<typeof BundleSizeSchema>;
export const BundleSizeSchema = v.object({
	size: v.object({
		type: StringSchema,
		uncompressedSize: StringSchema,
		compressedSize: StringSchema,
	}),
});
export const parseBundleSize = createParser(BundleSizeSchema);
