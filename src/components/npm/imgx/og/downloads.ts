import * as d3 from 'd3';
import { ArrowRight, Download } from 'lucide';

import { neutral_dark as neutral, primary_dark as primary } from '~/imgx/colors';
import type { TPackageDownloadsRangeSchema, TPackageNameSchema } from '~/npm/schema';
import { height, OGImageResponse, width } from '~/server/imgx/response/og';
import { formatNumberCompact } from '~/utils/formatter';

import { LucideIcon } from '../icons/lucide';
import { getChartSimpleLastYearDownloadsData } from '../utils/downloads';

export const og = (name: TPackageNameSchema, downloads: TPackageDownloadsRangeSchema['downloads']) => {
	const [chartData, totalDownloads] = getChartSimpleLastYearDownloadsData(downloads);

	const totalDownloadsFormatted = formatNumberCompact(totalDownloads);
	const isTotalDownloadsFormattedLengthGreaterThan4 = totalDownloadsFormatted.length > 4;

	return OGImageResponse(
		(e) => [
			(() => {
				const chartWidth = width - 500;
				const chartHeight = height - 330;

				const chartTop = 170;
				const chartRight = 100;

				const mx = 0;
				const my = 10;

				const x = d3.scaleLinear([0, chartData.length - 1], [mx, chartWidth - mx]);
				const y = d3.scaleLinear(d3.extent(chartData) as unknown as [number, number], [chartHeight - my, my]);
				const line = d3.line((_, i) => x(i), y).curve(d3.curveCatmullRom);

				const pathd = line(chartData);

				return [
					e('svg', {
						width: chartWidth,
						height: chartHeight,
						style: { position: 'absolute', top: chartTop, right: chartRight },
						children: [
							e('path', { fill: 'none', stroke: primary[3], strokeWidth: '4', d: pathd, style: { filter: 'blur(6px)' } }),
							e('path', { fill: 'none', stroke: primary[9], strokeWidth: '2', d: pathd }),
						],
					}),

					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to right, ${neutral[1]} 0%, ${neutral[4]} 60%)`,
							top: chartTop,
							left: 0,
							width: width,
							height: 1,
						},
					}),
					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to right, ${neutral[1]} 0%, ${neutral[4]} 60%)`,
							top: chartTop + chartHeight,
							left: 0,
							width: width,
							height: 1,
						},
					}),
					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to bottom, ${neutral[1]} 0%, ${neutral[4]} 60%)`,
							top: 0,
							right: chartRight,
							width: 1,
							height: height,
						},
					}),
					e('div', {
						style: {
							position: 'absolute',
							backgroundImage: `linear-gradient(to bottom, ${neutral[1]} 0%, ${neutral[4]} 60%)`,
							top: 0,
							right: chartRight + chartWidth,
							width: 1,
							height: height,
						},
					}),
				];
			})(),

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
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					gap: 2,
					position: 'absolute',
					top: 200,
					left: 115,
				},
				children: [
					e('div', {
						style: { display: 'flex', alignItems: 'center', gap: isTotalDownloadsFormattedLengthGreaterThan4 ? 12 : 16 },
						children: [
							LucideIcon({ i: Download, size: isTotalDownloadsFormattedLengthGreaterThan4 ? 38 : 44, color: neutral[12] }),
							e('div', {
								style: { color: neutral[11], fontSize: isTotalDownloadsFormattedLengthGreaterThan4 ? 55 : 60, fontWeight: 500 },
								children: totalDownloadsFormatted,
							}),
						],
					}),

					e('div', { style: { paddingLeft: 3, color: neutral[11], fontSize: 22, fontWeight: 400 }, children: 'last year' }),
				],
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
