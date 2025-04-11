import { createEffect } from 'solid-js';
import { isServer } from 'solid-js/web';

import * as DATA_ATTR from './core/data-attr';

import { mode, neutral, primary } from './state/state';

const setupDocAttr = () => {
	const setRootDataAttribute = (name: string, value: string) => {
		document.documentElement.setAttribute(`data-${name}`, value);
		console.log(`${name}=${value}`);
	};
	createEffect(() => {
		setRootDataAttribute(DATA_ATTR.MODE, mode());
	});
	createEffect(() => {
		setRootDataAttribute(DATA_ATTR.NEUTRAL, neutral());
	});
	createEffect(() => {
		setRootDataAttribute(DATA_ATTR.PRIMARY, primary());
	});
};

export const setup = () => {
	if (!isServer) {
		setupDocAttr();
	}
};
