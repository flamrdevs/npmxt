import { createNonKeyedResponseMemoCache } from '~/server/remecache';

type Module = { og: () => Promise<Response> };

const then = (module: Module) => module.og();

export const defaultStatic = (load: () => Promise<Module>) => {
	const withCache = createNonKeyedResponseMemoCache();

	return () => withCache(() => load().then(then));
};
