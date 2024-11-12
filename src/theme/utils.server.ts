import type { PageEvent } from '@solidjs/start/server';

import { NEUTRAL_DATA_ATTR, NEUTRAL_QUERY, PRIMARY_DATA_ATTR, PRIMARY_QUERY, isNeutral, isPrimary } from './utils';

export const getHTMLThemeProps = (event: PageEvent) => {
	const url = new URL(event.request.url);

	const props: Record<`data-${string}`, string> = {};

	let sp: string | null;
	if (isNeutral((sp = url.searchParams.get(NEUTRAL_QUERY)))) props[NEUTRAL_DATA_ATTR] = sp;
	if (isPrimary((sp = url.searchParams.get(PRIMARY_QUERY)))) props[PRIMARY_DATA_ATTR] = sp;

	return props;
};
