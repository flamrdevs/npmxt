import { json } from '@solidjs/router';

import { fetchPackageDownloadsPointLast } from '~/npm/utils';

import { catchErrorStatusMessage } from '~/server/error';
import { handleNotImplemented } from '~/server/handler/defaults';

export const GET = __DEV__
	? (event: SolidJS.Start.Server.APIEvent) => catchErrorStatusMessage(async () => json(await fetchPackageDownloadsPointLast(event.params['name'], event.params['last'])))
	: handleNotImplemented;
