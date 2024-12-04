const isTypeError = (error: unknown) => error instanceof TypeError;

const ENABLE: boolean = true;

export const createNonKeyedResponseMemoCache = () => {
	// in memory cache (serverless functions only)
	let v: Response | null = null;
	const fn = async (fx: () => Promise<Response>) => {
		try {
			return ENABLE ? (v ??= await fx()).clone() : await fx();
		} catch (error) {
			v = null;
			if (isTypeError(error)) return await fn(fx);
			throw error;
		}
	};
	fn.get = () => v as Response | null;
	return fn;
};

export const createKeyedResponseMemoCache = () => {
	// in memory cache (serverless functions only)
	const v: Record<string, Response | undefined> = {};
	const fn = async <T extends string>(key: T, fx: (key: T) => Promise<Response>) => {
		try {
			return ENABLE ? (v[key] ??= await fx(key)).clone() : await fx(key);
		} catch (error) {
			v[key] = undefined;
			if (isTypeError(error)) return await fn<T>(key, fx);
			throw error;
		}
	};
	fn.get = () => v as Record<string, Response>;
	return fn;
};
