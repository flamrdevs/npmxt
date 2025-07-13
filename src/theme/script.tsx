import * as CORE from './core/core';
import * as DATA_ATTR from './core/data-attr';
import * as FALLBACK from './core/fallback';
import * as STORAGE_KEY from './core/storage-key';

export const Script = () => {
	const RUN = true;

	const autoFn = (scope: string) => `(() => {${scope}})${RUN ? '()' : ''};`;

	const create = (inputs: [string, string[], string, string][]) => {
		let scope = '';

		scope +=
			// biome-ignore lint/suspicious/noTemplateCurlyInString: ok
			'const fn = (storageKey, validItems, fallback, dataAttr) => {let attrValue = fallback;try {const item = localStorage.getItem(storageKey);if (typeof item === "string" && validItems.includes(item)) attrValue = item;} catch (error) {}document.documentElement.setAttribute(`data-${dataAttr}`, attrValue);};';

		for (const [storageKey, validItems, fallback, dataAttr] of inputs) {
			scope += autoFn(`fn("${storageKey}",["${validItems.join(`","`)}"],"${fallback}","${dataAttr}")`);
		}

		return autoFn(scope);
	};

	return (
		<script
			innerHTML={create([
				[STORAGE_KEY.MODE, CORE.MODE, FALLBACK.MODE, DATA_ATTR.MODE],
				[STORAGE_KEY.NEUTRAL, CORE.NEUTRAL, FALLBACK.NEUTRAL, DATA_ATTR.NEUTRAL],
				[STORAGE_KEY.PRIMARY, CORE.PRIMARY, FALLBACK.PRIMARY, DATA_ATTR.PRIMARY],
			])}
		/>
	);
};
