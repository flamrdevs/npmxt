import { server } from './node';

import { onUnhandledRequest } from './utils';

let listened = false;
export const listen = () => {
	if (!listened) {
		listened = true;
		server.listen({ onUnhandledRequest });
	}
};
