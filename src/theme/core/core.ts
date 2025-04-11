export type Mode = (typeof MODE)[number];
export const MODE = ['dark', 'light'] as const satisfies string[];

export type Neutral = (typeof NEUTRAL)[number];
export const NEUTRAL = ['gray', 'slate', 'mauve', 'sage', 'olive', 'sand'] as const satisfies string[];

export type Primary = (typeof PRIMARY)[number];
export const PRIMARY = ['brown', 'orange', 'ruby', 'pink', 'purple', 'iris', 'blue', 'teal', 'grass'] as const satisfies string[];
