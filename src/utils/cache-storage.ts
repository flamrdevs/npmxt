import { isServer } from 'solid-js/web';

import { createStorage } from 'unstorage';
import indexedb from 'unstorage/drivers/indexedb';
import memory from 'unstorage/drivers/memory';

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

	const fn = async (key: string, fx: () => Promise<T>): Promise<T> => {
		if (__DEV__) if (!__TEST__) await delay(200);

		const item = await storage.get<StorageValue>(key);

		const now = Date.now();

		if (item && now < item.t) {
			if (__DEV__) console.log(`[${base}] ${'cache hit'.padEnd(11)} | ${key}`);
			return item.d;
		}

		if (__DEV__) if (!__TEST__) await delay(400);

		const data = await fx();
		await storage.set<StorageValue>(key, { d: data, t: now + 64_800_000 /* + 18 hours */ });
		if (__DEV__) console.log(`[${base}] ${'cache miss'.padEnd(11)} | ${key}`);
		return data;
	};

	if (!isServer) window.addEventListener('beforeunload', () => storage.dispose());

	return fn;
};
