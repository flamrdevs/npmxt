import { render } from '@solidjs/testing-library';

import { IconButton, iconButtonVariants } from './icon-button';

describe('IconButton', () => {
	it('Rendered', () => {
		const { getByTestId } = render(() => <IconButton data-testid="root" class="additional class" />);

		const element = getByTestId('root');

		expect(element).toBeDefined();
		expect(element).toHaveClass(iconButtonVariants({}, 'additional class'));
	});
});
