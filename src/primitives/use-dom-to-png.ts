import { createSignal } from 'solid-js';

import { type Options, domToPng } from 'modern-screenshot';

import { delay } from '~/utils/delay';

export const useDOMToPNG = <N extends Node>(getNode: () => N, options?: Options) => {
	const [saving, setSaving] = createSignal(false);

	return [
		saving,
		async (name: string) => {
			if (saving()) return;

			setSaving(true);

			const href = await domToPng(getNode(), options);

			if (__DEV__) await delay();

			const link = document.createElement('a');
			link.download = `${name}.png`;
			link.href = href;
			link.click();

			setSaving(false);
		},
	] as const;
};
