import { h } from './h';

describe('h', () => {
	it('works correctly', async () => {
		const Component = ({ children }: Record<string, any>) => h.e('div', { children });

		expect(
			h.r('div', {
				style: {
					display: 'flex',
					width: 500,
					height: 500,
				},
				children: [
					h.e('div', {
						children: '1',
					}),
					h.e('div', {
						children: '2',
					}),
					[3, 4].map((e) =>
						h.e('div', {
							children: e,
						})
					),
					h.e(Component, { children: 'component' }),
				],
			})
		).toEqual({
			type: 'div',
			props: {
				style: {
					display: 'flex',
					width: 500,
					height: 500,
				},
				children: [
					{
						type: 'div',
						props: {
							children: '1',
						},
					},
					{
						type: 'div',
						props: {
							children: '2',
						},
					},
					[
						{
							type: 'div',
							props: {
								children: 3,
							},
						},
						{
							type: 'div',
							props: {
								children: 4,
							},
						},
					],
					{
						type: 'div',
						props: {
							children: 'component',
						},
					},
				],
			},
		});
	});
});
