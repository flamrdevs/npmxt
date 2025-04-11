import * as FALLBACK from './fallback';
import * as is from './is';

export const mode = (value: unknown) => (is.mode(value) ? value : FALLBACK.MODE);
export const neutral = (value: unknown) => (is.neutral(value) ? value : FALLBACK.NEUTRAL);
export const primary = (value: unknown) => (is.primary(value) ? value : FALLBACK.PRIMARY);
