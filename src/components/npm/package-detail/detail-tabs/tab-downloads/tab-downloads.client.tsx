import { A, createAsync, query, useLocation } from '@solidjs/router';
import { Show, createMemo } from 'solid-js';

import { Root as Link } from '@kobalte/core/link';

import * as d3 from 'd3';

import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide';

import { NumberTicker } from '~/components/effect/number-ticker';
import { LucideIcon } from '~/components/icons';
import { Separator } from '~/components/ui';

import { usePackageContext } from '~/contexts/package-context';

import { PACKAGE_DOWNLOADS_LAST_MAP, type TPackageDownloadsRangeSchema, type TPackageSchema } from '~/npm/schema';
import { fetchPackageDownloadsRangeLast } from '~/npm/utils';

import { linkWithThemeQuery } from '~/theme/router';

import { formatNumber } from '~/utils/formatter';

const Chart = (props: { d1: number[]; d2: number[] }) => {
	return createMemo(() => {
		const chartWidth = 120;
		const chartHeight = 50;

		const mx = 5;
		const my = 5;

		const x = d3.scaleLinear([0, props.d2.length - 1], [mx, chartWidth - mx]);
		const y = d3.scaleLinear(d3.extent([...props.d1, ...props.d2]) as unknown as [number, number], [chartHeight - my, my]);

		return (
			// biome-ignore lint/a11y/noSvgWithoutTitle: prefer no title
			<svg width={chartWidth} height={chartHeight}>
				<path d={d3.line((_, i) => x(i), y).curve(d3.curveCatmullRom)(props.d1) || undefined} fill="none" stroke-dasharray="2" class="stroke-1 stroke-cn-6" />
				<path d={d3.line((_, i) => x(i), y).curve(d3.curveCatmullRom)(props.d2) || undefined} fill="none" class="stroke-1 stroke-cp-9" />
			</svg>
		);
	}) as unknown as Solid.JSX.Element;
};

const Card = (props: { label: string; period: number; lastYear: TPackageDownloadsRangeSchema }) => {
	const count2 = createMemo(() => {
		const period2 = props.lastYear.downloads.slice(-(props.period * 2));

		// chart data
		const d1: number[] = [];
		const d2: number[] = [];

		// period count
		let c1 = 0;
		let c2 = 0;

		let d: number;
		let i = 0;
		for ({ downloads: d } of period2) {
			if (i < props.period) {
				d1.push(d);
				c1 += d;
			} else {
				d2.push(d);
				c2 += d;
			}
			i++;
		}

		// is c2 greather than c1
		const c2gtc1 = c2 > c1;

		// percent
		const p = `${((c2gtc1 ? (c2 - c1) / c1 : (c1 - c2) / c1) * 100).toFixed(2)}%`;

		return {
			d1,
			d2,
			c1,
			c2,
			c2gtc1,
			p,
		};
	});

	return (
		<div class="flex items-center justify-between p-2.5 md:p-4 xl:p-6">
			<div>
				<div class="mb-0.5 md:mb-1 text-sm text-cn-10">{props.label}</div>
				<NumberTicker value={count2().c2} format={formatNumber} class="text-xl md:text-2xl xl:text-3xl tabular-nums text-cn-12" />

				<div class="flex items-center gap-1.5 md:gap-2.5 mt-0.5 md:mt-1">
					<div class={`flex items-center gap-0.5 md:gap-1 ${count2().c2gtc1 ? 'text-cs-9' : 'text-ce-9'}`}>
						<LucideIcon i={count2().c2gtc1 ? ArrowUpRight : ArrowDownRight} class="size-4" />
						<span class="text-xs">{count2().p}</span>
					</div>
					<span class="text-xs text-cn-10">vs previous</span>
				</div>
			</div>

			<div>
				<Chart d1={count2().d1} d2={count2().d2} />
			</div>
		</div>
	);
};

const getLastYear = query((pkg: TPackageSchema) => fetchPackageDownloadsRangeLast(pkg.name, 'year'), 'package-downloads-last-year');

export default () => {
	const location = useLocation();

	const pkg = usePackageContext();

	const lastYear = createAsync(() => getLastYear(pkg));

	return (
		<Show when={lastYear()} keyed>
			{(lastYear) => (
				<div class="flex flex-col gap-2 md:gap-3 w-full max-w-2xl">
					<Card label="Last week" period={PACKAGE_DOWNLOADS_LAST_MAP.week} lastYear={lastYear} />
					<Separator />
					<Card label="Last month" period={PACKAGE_DOWNLOADS_LAST_MAP.month} lastYear={lastYear} />
					<Separator />
					<div class="py-1 md:py-2">
						<Link as={A} href={linkWithThemeQuery(`/downloads/${pkg.name}`, location.query)} class="inline-flex items-center justify-center gap-2 px-4 py-2 text-base text-cn-10 hover:text-cp-10">
							<span>View all time downloads</span>
							<LucideIcon i={ArrowRight} class="size-4" />
						</Link>
					</div>
				</div>
			)}
		</Show>
	);
};
