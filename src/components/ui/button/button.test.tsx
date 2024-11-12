import { render } from '@solidjs/testing-library';

import { Button, buttonVariants } from './button';

describe('Button', () => {
	it('Rendered', () => {
		const { getByTestId } = render(() => <Button data-testid="root" class="additional class" />);

		const element = getByTestId('root');

		expect(element).toBeDefined();
		expect(element).toHaveClass(buttonVariants({}, 'additional class'));
	});
});
