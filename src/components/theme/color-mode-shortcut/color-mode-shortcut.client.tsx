import { useColorMode } from '@kobalte/core/color-mode';

import { createShortcut } from '@solid-primitives/keyboard';

export default () => {
	const { toggleColorMode } = useColorMode();
	createShortcut(['Control', 'Shift', 'D'], toggleColorMode, { preventDefault: true });
	return null;
};
