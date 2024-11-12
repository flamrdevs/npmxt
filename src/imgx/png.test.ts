import { png } from './png';

describe('png', () => {
	it('works correctly', async () => {
		expect(
			await png({
				type: 'div',
				props: {
					style: {
						width: 500,
						height: 500,
					},
					children: 'png',
				},
			})
		).toBeInstanceOf(Buffer);
	});
});
