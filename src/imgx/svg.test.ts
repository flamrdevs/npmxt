import { svg } from './svg';

describe('svg', () => {
	it('works correctly', async () => {
		expect(
			await svg({
				type: 'div',
				props: {
					style: {
						width: 500,
						height: 500,
					},
					children: 'svg',
				},
			})
		).toBeTypeOf('string');
	});
});
