export const NEUTRAL = ['gray', 'slate', 'mauve', 'sage', 'olive', 'sand'] as const satisfies string[];
export const FALLBACK_NEUTRAL = NEUTRAL[0];
export type Neutral = (typeof NEUTRAL)[number];
export const isNeutral = (value: unknown): value is Neutral => typeof value === 'string' && NEUTRAL.includes(value as Neutral);
export const validNeutral = (value: unknown) => (isNeutral(value) ? value : FALLBACK_NEUTRAL);
export const NEUTRAL_QUERY = 'xn';
export const NEUTRAL_DATA_ATTR = 'data-cn';

export const PRIMARY = ['ruby', 'pink', 'purple', 'iris', 'blue', 'teal'] as const satisfies string[];
export const FALLBACK_PRIMARY = PRIMARY[3];
export type Primary = (typeof PRIMARY)[number];
export const isPrimary = (value: unknown): value is Primary => typeof value === 'string' && PRIMARY.includes(value as Primary);
export const validPrimary = (value: unknown) => (isPrimary(value) ? value : FALLBACK_PRIMARY);
export const PRIMARY_QUERY = 'xp';
export const PRIMARY_DATA_ATTR = 'data-cp';
