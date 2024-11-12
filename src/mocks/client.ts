import { worker } from './browser';

import { onUnhandledRequest } from './utils';

let started = false;
export const start = async () => {
	if (!started) {
		started = true;
		await worker.start({ onUnhandledRequest });
	}
};
