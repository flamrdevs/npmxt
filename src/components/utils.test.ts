import { klassXVariants } from './utils';

describe('klassXVariants', () => {
	it('works correctly', () => {
		expect(
			klassXVariants({
				variant: ['a', 'b'],
			})
		).toEqual({
			variant: {
				a: 'x-variant-a',
				b: 'x-variant-b',
			},
		});
	});
});
