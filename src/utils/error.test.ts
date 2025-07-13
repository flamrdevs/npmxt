import * as v from 'valibot';

import { errorStatusMessage, StatusError } from './error';

describe('StatusError', () => {
	it('works correctly', () => {
		const error = new StatusError('not found', 404);

		expect(error).toHaveProperty('message');
		expect(error).toHaveProperty('status');
		expect(error).toMatchObject({
			message: 'not found',
			status: 404,
		});
	});
});

describe('errorStatusMessage', () => {
	it('works correctly', async () => {
		const result_ValiError = errorStatusMessage(
			(() => {
				try {
					return v.parse(v.string('StringError'), false);
				} catch (error) {
					return error;
				}
			})()
		);
		expect(result_ValiError).toMatchObject({
			message: 'StringError',
			status: 400,
		});

		const result_StatusError = errorStatusMessage(new StatusError('StatusError', 404));
		expect(result_StatusError).toMatchObject({
			message: 'StatusError',
			status: 404,
		});

		const result_Error = errorStatusMessage(new Error('Error'));
		expect(result_Error).toMatchObject({
			message: 'Error',
			status: 500,
		});
	});
});
