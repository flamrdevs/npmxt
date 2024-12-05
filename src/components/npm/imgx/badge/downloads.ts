import { Download } from 'lucide';

import { SVGImageResponse } from '~/server/imgx/response/svg';

import { h } from '~/imgx';
import { neutral_dark as neutral } from '~/imgx/colors';

import { formatNumberCompact } from '~/utils/formatter';

import { LucideIcon } from '../icons/lucide';

const component = (downloads: number, per: string) => {
	const text = `${formatNumberCompact(downloads)}/${per}`;

	const height = 24;
	const width = 24 + (text.length * 8 + 16);

	return SVGImageResponse(
		h.r('div', {
			style: {
				display: 'flex',
				width,
				height,
				backgroundColor: neutral[9],
				color: 'white',
				border: `1px solid ${neutral[10]}`,
				borderRadius: 10,
				overflow: 'hidden',
			},
			children: [
				h.e('div', {
					style: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						top: 0,
						left: 0,
						paddingBottom: 2,
						paddingLeft: 2,
						width: height,
						height: height,
						backgroundColor: neutral[9],
						color: 'white',
					},
					children: LucideIcon({ i: Download, size: 14, color: 'white' }),
				}),
				h.e('div', {
					style: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						top: 0,
						left: height,
						paddingRight: 2,
						paddingBottom: 2,
						width: width - height,
						height: height,
						backgroundColor: neutral[7],
						color: 'white',
						fontSize: 12,
						fontWeight: 500,
					},
					children: text,
				}),
			],
		})
	);
};

export const m = (downloads: number) => component(downloads, 'month');

export const y = (downloads: number) => component(downloads, 'year');
