import { json } from '@solidjs/router';

import { fetchPackageDownloadsRangeLast } from '~/npm/utils';

import { catchErrorStatusMessage } from '~/server/error';
import { handleNotImplemented } from '~/server/handler/defaults';

export const GET = __DEV__
	? (event: SolidJS.Start.Server.APIEvent) => catchErrorStatusMessage(async () => json(await fetchPackageDownloadsRangeLast(event.params['name'], event.params['last'])))
	: handleNotImplemented;
