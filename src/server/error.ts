import { json } from '@solidjs/router';

import { errorStatusMessage } from '~/utils/error';

export const jsonErrorStatusMessageResponse = (error: unknown) => {
	const { status, message } = errorStatusMessage(error);
	return json({ message }, { status });
};

export const catchErrorStatusMessage = async <T>(fn: () => Promise<T>) => {
	try {
		return await fn();
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
};
