import { json } from '@solidjs/router';

import { errorStatusMessage } from '~/utils/error';

export const jsonErrorStatusMessageResponse = (error: unknown) => {
	const { status, message } = errorStatusMessage(error);
	return json({ message }, { status });
};
