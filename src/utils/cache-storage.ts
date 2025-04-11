import { isServer } from 'solid-js/web';

import { createStorage } from 'unstorage';
import indexedb from 'unstorage/drivers/indexedb';
import memory from 'unstorage/drivers/memory';

import { delay } from '~/utils/delay';

export const createCacheStorage = <T>(base: string) => {
	type StorageValue = {
		// data
		d: T;
		// expires
		t: number;
	};

	const storage = createStorage<StorageValue>({
		driver: isServer ? memory() : indexedb({ base }),
	});

	const fxLoading: Record<string, boolean | undefined> = {};

	const waitForFxLoading = async (key: string) => {
		let isFxLoading: boolean | undefined;
		while (typeof (isFxLoading = fxLoading[key]) === 'boolean' && isFxLoading) await delay(__DEV__ ? 100 : 10);
		return;
	};

	const fn = async <K extends string>(key: K, fx: (key: K) => Promise<T>): Promise<T> => {
		if (__DEV__) if (!__TEST__) await delay(200);

		await waitForFxLoading(key);

		const now = Date.now();

		const item = await storage.get<StorageValue>(key);
		if (item && now < item.t) {
			if (__DEV__) console.log(`[${base}] ${'cache hit'.padEnd(11)} | ${key}`);
			return item.d;
		}

		fxLoading[key] = true;
		try {
			if (__DEV__) if (!__TEST__) await delay(400);
			const data = await fx(key);
			await storage.set<StorageValue>(key, { d: data, t: now + 64_800_000 /* + 18 hours */ });
			if (__DEV__) console.log(`[${base}] ${'cache miss'.padEnd(11)} | ${key}`);
			fxLoading[key] = false;
			return data;
		} catch (error) {
			fxLoading[key] = false;
			throw error;
		}
	};

	if (!isServer) window.addEventListener('beforeunload', () => storage.dispose());

	return fn;
};
