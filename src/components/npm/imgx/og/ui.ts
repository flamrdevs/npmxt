import { ArrowRight } from 'lucide';

import { neutral_dark as neutral } from '~/imgx/colors';
import { OGImageResponse } from '~/server/imgx/response/og';

import { LucideIcon } from '../icons/lucide';

export const og = () => {
	return OGImageResponse(
		(e) => [
			e('div', {
				style: {
					position: 'absolute',
					top: '47%',
					left: '50%',
					transform: 'translate(-50%,-50%)',
					color: neutral[1],
					fontSize: 400,
					fontWeight: 700,
					opacity: 0.2,
					filter: 'drop-shadow(0 0 1px white)',
				},
				children: 'npmxt',
			}),

			e('div', {
				style: {
					position: 'absolute',
					top: '45%',
					left: '50%',
					transform: 'translate(-50%,-50%)',
					color: neutral[11],
					fontSize: 100,
					fontWeight: 600,
				},
				children: 'UI',
			}),

			e('div', {
				style: {
					display: 'flex',
					position: 'absolute',
					top: '60%',
					left: '48%',
					transform: 'translate(-50%,-50%)',
					width: 660,
					height: 3,
					backgroundColor: neutral[11],
					borderRadius: 4,
				},
			}),

			e('div', {
				style: {
					display: 'flex',
					position: 'absolute',
					top: '60%',
					left: '80%',
					transform: 'translate(-50%,-50%)',
				},
				children: LucideIcon({ i: ArrowRight, size: 72, color: neutral[11] }),
			}),
		],
		{
			style: {
				display: 'flex',
				position: 'relative',
				backgroundColor: neutral[1],
				color: neutral[12],
				border: `1px solid ${neutral[2]}`,
			},
			maxAge: 8640000, // 100 days
		}
	);
};
