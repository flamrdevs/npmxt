import type { Location } from '@solidjs/router';

import { NEUTRAL_QUERY, PRIMARY_QUERY, validNeutral, validPrimary } from './utils';

export const linkWithThemeQuery = (href: string, locationQueryProxy: Location['query']) => {
	const sp: string[] = [];

	const { [NEUTRAL_QUERY]: queryNeutral, [PRIMARY_QUERY]: queryPrimary } = locationQueryProxy;

	let value: any;
	if ((value = queryNeutral)) sp.push(`${NEUTRAL_QUERY}=${validNeutral(value)}`);
	if ((value = queryPrimary)) sp.push(`${PRIMARY_QUERY}=${validPrimary(value)}`);

	return `${href}${sp.length ? `?${sp.join('&')}` : ''}`;
};
