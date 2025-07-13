import * as v from 'valibot';

import { StatusError } from '~/utils/error';

import { jsonErrorStatusMessageResponse } from './error';

describe('jsonErrorStatusMessageResponse', () => {
	it('works correctly', async () => {
		const response_ValiError = jsonErrorStatusMessageResponse(
			(() => {
				try {
					return v.parse(v.string('StringError'), false);
				} catch (error) {
					return error;
				}
			})()
		);
		expect(response_ValiError.ok).toBeFalsy();
		expect(response_ValiError.status).toEqual(400);
		expect(response_ValiError.customBody()).toMatchObject({ message: expect.any(String) });

		const response_StatusError = jsonErrorStatusMessageResponse(new StatusError('StatusError', 404));
		expect(response_StatusError.ok).toBeFalsy();
		expect(response_StatusError.status).toEqual(404);
		expect(response_StatusError.customBody()).toMatchObject({ message: expect.any(String) });

		const response_Error = jsonErrorStatusMessageResponse(new Error('Error'));
		expect(response_Error.ok).toBeFalsy();
		expect(response_Error.status).toEqual(500);
		expect(response_Error.customBody()).toMatchObject({ message: expect.any(String) });
	});
});
