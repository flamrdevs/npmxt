import { FetchError, ofetch } from 'ofetch';

describe('*name', () => {
	it.for([
		//
		['solid-js'],
		['@solidjs/start'],
	])('valid - %s', async ([pkg]) => {
		const fn = () => ofetch(`/api/package-creation/${pkg}`);

		expect(fn).not.toThrow(FetchError);

		const data = await fn();

		expect(data).toBeTypeOf('object');
		expect(data).toHaveProperty('date');
		expect(data.date).toBeTypeOf('string');
	});
});
