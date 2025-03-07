import { createNonKeyedResponseMemoCache } from '~/server/remecache';

export const defaultStatic = (() => {
	type Module = { og: () => Promise<Response> };

	const then = (module: Module) => module.og();

	return (load: () => Promise<Module>) => {
		const withCache = createNonKeyedResponseMemoCache();

		return () => withCache(() => load().then(then));
	};
})();
