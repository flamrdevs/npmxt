import { worker } from './src/mocks/browser';
import { onUnhandledRequest } from './src/mocks/utils';

beforeAll(async () => {
	await worker.start({ onUnhandledRequest });
});

afterEach(() => {
	worker.resetHandlers();
});

afterAll(() => {
	worker.stop();
});
