import indexeddb from 'fake-indexeddb';

import { server } from '~/mocks/node';
import { onUnhandledRequest } from '~/mocks/utils';

globalThis.indexedDB = indexeddb;

beforeAll(() => {
	server.listen({ onUnhandledRequest });
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
