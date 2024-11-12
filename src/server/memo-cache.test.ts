import { createKeyedMemoCache, createNonKeyedMemoCache } from './memo-cache';

describe('createNonKeyedMemoCache', () => {
	it('works correctly', async () => {
		const withCache = createNonKeyedMemoCache();

		expect(withCache.get()).toBeNull();

		const response = new Response('response', { status: 200 });
		await withCache(() => Promise.resolve(response));

		expect(withCache.get()).toEqual(response);
	});
});

describe('createKeyedMemoCache', () => {
	it('works correctly', async () => {
		const withCache = createKeyedMemoCache();

		expect(withCache.get()).toBeTypeOf('object');

		const response1 = new Response('response1', { status: 200 });
		await withCache('key-1', () => Promise.resolve(response1));

		const value1 = withCache.get();
		expect(Object.keys(value1).length).toEqual(1);
		expect(value1['key-1']).toEqual(response1);

		const response2 = new Response('response2', { status: 200 });
		await withCache('key-2', () => Promise.resolve(response2));

		const value2 = withCache.get();
		expect(Object.keys(value2).length).toEqual(2);
		expect(value2['key-2']).toEqual(response2);
	});
});
