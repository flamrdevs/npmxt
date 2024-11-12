import { classesToArray } from './utils';

describe('classesToArray', () => {
	it('works correctly', () => {
		expect(
			classesToArray({
				class: 'class',
				classList: 'classList',
			})
		).toEqual(['class', 'classList']);

		expect(
			classesToArray({
				class: ['class'],
				classList: ['classList'],
			})
		).toEqual([['class'], ['classList']]);
	});
});
