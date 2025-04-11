import type * as CORE from '../core/core';
import * as is from '../core/is';
import * as STORAGE_KEY from '../core/storage-key';

const createStorage = <T extends string>(key: string, validate: (input: unknown) => input is T) => {
	return {
		get: () => {
			try {
				const item = localStorage.getItem(key);
				if (validate(item)) return item;
			} catch (error) {
				if (__DEV__) console.error(error);
			}
		},
		set: (value: T) => {
			try {
				localStorage.setItem(key, value);
			} catch (error) {
				if (__DEV__) console.error(error);
			}
		},
	};
};

export const mode = createStorage<CORE.Mode>(STORAGE_KEY.MODE, is.mode);
export const neutral = createStorage<CORE.Neutral>(STORAGE_KEY.NEUTRAL, is.neutral);
export const primary = createStorage<CORE.Primary>(STORAGE_KEY.PRIMARY, is.primary);
