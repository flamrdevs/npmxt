import { json } from '@solidjs/router';

import { ofetch } from 'ofetch';
import { BASE_URL_REGISTRY } from '~/npm/url';

import { catchErrorStatusMessage } from '~/server/error';
import { handleNotImplemented } from '~/server/handler/defaults';

export const GET = __DEV__ ? (event: SolidJS.Start.Server.APIEvent) => catchErrorStatusMessage(async () => json(await ofetch(`${BASE_URL_REGISTRY}/${event.params['path']}`))) : handleNotImplemented;
