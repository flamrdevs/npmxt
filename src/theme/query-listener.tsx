import { useLocation } from '@solidjs/router';
import { createEffect, createMemo } from 'solid-js';
import { isServer } from 'solid-js/web';

import { NEUTRAL_DATA_ATTR, NEUTRAL_QUERY, PRIMARY_DATA_ATTR, PRIMARY_QUERY, validNeutral, validPrimary } from './utils';

export const QueryListener = () => {
	if (!isServer) {
		const location = useLocation();

		const xn = createMemo(() => {
			const { [NEUTRAL_QUERY]: val } = location.query;
			return val;
		});
		const xp = createMemo(() => {
			const { [PRIMARY_QUERY]: val } = location.query;
			return val;
		});

		createEffect(() => {
			document.documentElement.setAttribute(NEUTRAL_DATA_ATTR, validNeutral(xn()));
		});

		createEffect(() => {
			document.documentElement.setAttribute(PRIMARY_DATA_ATTR, validPrimary(xp()));
		});
	}

	return null;
};
