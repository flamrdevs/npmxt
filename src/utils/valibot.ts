import * as v from 'valibot';

export type UnknownBaseSchema = v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;

export type Parser<T extends UnknownBaseSchema, I = unknown> = {
	(input: I): v.InferOutput<T>;
	safe: (input: I) => v.SafeParseResult<T>;
};

export const createParser = <T extends UnknownBaseSchema>(schema: T) => {
	const fn = ((input: unknown) => v.parse(schema, input)) as Parser<T>;
	fn.safe = (input: unknown) => v.safeParse(schema, input);
	return fn;
};

export const getErrorMessage = (error: v.ValiError<any>) => error.issues[0].message || error.message;
