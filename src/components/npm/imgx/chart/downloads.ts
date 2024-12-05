import * as d3 from 'd3';

import { Download } from 'lucide';

import type { TPackageDownloadsRangeSchema } from '~/npm/schema';
import { SVGImageResponse } from '~/server/imgx/response/svg';

import { h } from '~/imgx';
import { neutral_dark as neutral, primary_dark as primary } from '~/imgx/colors';

import { formatNumber } from '~/utils/formatter';

import { LucideIcon } from '../icons/lucide';

import { getChartSimpleLastMonthDownloadsData, getChartSimpleLastYearDownloadsData } from '../utils/downloads';

const component = (chartData: number[], totalDownloads: number, last: string) => {
	const width = 400;
	const height = 220;

	return SVGImageResponse(
		h.r('div', {
			style: {
				display: 'flex',
				width,
				height,
				backgroundColor: neutral[2],
				color: 'white',
				border: `1px solid ${neutral[5]}`,
				borderRadius: 15,
				overflow: 'hidden',
			},
			children: [
				(() => {
					const chartWidth = width - 0;
					const chartHeight = height - 85;

					const mx = 0;
					const my = 10;

					const x = d3.scaleLinear([0, chartData.length - 1], [mx, chartWidth - mx]);
					const y = d3.scaleLinear(d3.extent(chartData) as unknown as [number, number], [chartHeight - my, my]);
					const line = d3.line((_, i) => x(i), y).curve(d3.curveCatmullRom);

					const pathd = line(chartData);

					return h.e('svg', {
						width: chartWidth,
						height: chartHeight,
						style: { position: 'absolute', left: '50%', bottom: 10, transform: 'translateX(-50%)' },
						children: [h.e('path', { fill: 'none', stroke: primary[9], strokeWidth: '1', d: pathd, style: { filter: `drop-shadow(0 0 1px ${primary[9]})` } })],
					});
				})(),

				h.e('div', {
					style: {
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'space-between',
						gap: 2,
						position: 'absolute',
						top: 12,
						left: 15,
					},
					children: [
						h.e('div', {
							style: { display: 'flex', alignItems: 'center', gap: 6 },
							children: [LucideIcon({ i: Download, size: 20, color: 'white' }), h.e('div', { style: { fontSize: 24, fontWeight: 500 }, children: formatNumber(totalDownloads) })],
						}),

						h.e('div', { style: { paddingLeft: 2, fontSize: 14, fontWeight: 400 }, children: `last ${last}` }),
					],
				}),
			],
		})
	);
};

export const m = (downloads: TPackageDownloadsRangeSchema['downloads']) => {
	const [chartData, totalDownloads] = getChartSimpleLastMonthDownloadsData(downloads);
	return component(chartData, totalDownloads, 'month');
};

export const y = (downloads: TPackageDownloadsRangeSchema['downloads']) => {
	const [chartData, totalDownloads] = getChartSimpleLastYearDownloadsData(downloads);
	return component(chartData, totalDownloads, 'year');
};
