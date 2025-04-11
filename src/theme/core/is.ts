import * as CORE from './core';

const fn = (array: string[], search: unknown) => typeof search === 'string' && array.includes(search);

export const mode = (value: unknown): value is CORE.Mode => fn(CORE.MODE, value);
export const neutral = (value: unknown): value is CORE.Neutral => fn(CORE.NEUTRAL, value);
export const primary = (value: unknown): value is CORE.Primary => fn(CORE.PRIMARY, value);
