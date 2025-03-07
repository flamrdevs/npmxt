import { ArrowRight } from 'lucide';

import { OGImageResponse, height, width } from '~/server/imgx/response/og';

import { neutral_dark as neutral } from '~/imgx/colors';

import type { TPackageNameSchema } from '~/npm/schema';
import { LucideIcon } from '../icons/lucide';

export const og = (name: TPackageNameSchema, version: string, description?: string) => {
	return OGImageResponse(
		(e) => [
			e('div', {
				style: {
					display: 'flex',
					position: 'absolute',
					top: 0,
					left: 0,
					width,
					height,
				},
				children: [
					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to right, ${neutral[1]}, ${neutral[4]})`,
							top: '15%',
							left: '50%',
							width,
							height: 1,
							transform: 'translate(-50%,-50%)',
						},
					}),

					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to right, ${neutral[1]}, ${neutral[4]})`,
							top: '70%',
							left: '50%',
							width,
							height: 1,
							transform: 'translate(-50%,-50%)',
						},
					}),

					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to bottom, ${neutral[1]}, ${neutral[4]})`,
							top: '50%',
							left: '45%',
							width: 1,
							height,
							transform: 'translate(-50%,-50%)',
						},
					}),

					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to bottom, ${neutral[1]}, ${neutral[4]})`,
							top: '50%',
							left: '90%',
							width: 1,
							height,
							transform: 'translate(-50%,-50%)',
						},
					}),
				],
			}),

			e('div', {
				style: {
					display: 'flex',
					position: 'absolute',
					top: 90,
					left: 95,
					width: width - 220,
					fontSize: 55,
					fontWeight: 600,
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
				},
				children: name,
			}),

			e('div', {
				style: {
					display: 'flex',
					position: 'absolute',
					top: 175,
					left: 100,
					width: width - 220,
					fontSize: 35,
					fontWeight: 600,
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
				},
				children: version,
			}),

			description &&
				e('div', {
					style: {
						display: 'flex',
						position: 'absolute',
						top: 240,
						left: 100,
						width: width - 220,
						fontSize: 35,
						fontWeight: 600,
						textOverflow: 'ellipsis',
						whiteSpace: 'wrap',
						color: neutral[11],
						overflow: 'hidden',
					},
					children: description,
				}),

			e('div', { style: { position: 'absolute', bottom: 85, left: 120, color: neutral[10], fontSize: 38, fontWeight: 700 }, children: 'npmxt' }),

			e('div', {
				style: { display: 'flex', alignItems: 'center', gap: 20, position: 'absolute', bottom: 85, right: 150 },
				children: LucideIcon({ i: ArrowRight, size: 40, color: neutral[11] }),
			}),
		],
		{
			style: {
				display: 'flex',
				backgroundColor: neutral[1],
				color: neutral[12],
				border: `1px solid ${neutral[2]}`,
				overflow: 'hidden',
			},
		}
	);
};
