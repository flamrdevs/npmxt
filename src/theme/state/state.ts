import { createSignal } from 'solid-js';
import { isServer } from 'solid-js/web';

import type * as CORE from '../core/core';
import * as FALLBACK from '../core/fallback';
import * as is from '../core/is';

import * as storage from './storage';

const initialValue = <T>(getter: () => NoInfer<T> | undefined, fallback: NoInfer<T>): T => {
	if (isServer) return fallback;
	return getter() || fallback;
};

const [mode, setMode] = createSignal<CORE.Mode>(initialValue(storage.mode.get, FALLBACK.MODE));
const [neutral, setNeutral] = createSignal<CORE.Neutral>(initialValue(storage.neutral.get, FALLBACK.NEUTRAL));
const [primary, setPrimary] = createSignal<CORE.Primary>(initialValue(storage.primary.get, FALLBACK.PRIMARY));

export { mode, neutral, primary };

export const changeMode = (value: CORE.Mode | (string & {})) => {
	if (is.mode(value)) {
		setMode(value);
		if (!isServer) storage.mode.set(value);
	}
};

export const changeNeutral = (value: CORE.Neutral | (string & {})) => {
	if (is.neutral(value)) {
		setNeutral(value);
		if (!isServer) storage.neutral.set(value);
	}
};

export const changePrimary = (value: CORE.Primary | (string & {})) => {
	if (is.primary(value)) {
		setPrimary(value);
		if (!isServer) storage.primary.set(value);
	}
};
