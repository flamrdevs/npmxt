import { Show, createEffect, createMemo, onCleanup, onMount } from 'solid-js';

import { createAsync, query } from '@solidjs/router';

import { createResizeObserver } from '@solid-primitives/resize-observer';

import { ImageDown, Settings2 } from 'lucide';

import * as Plot from '@observablehq/plot';

import { NumberTicker } from '~/components/effect/number-ticker';
import { LucideIcon } from '~/components/icons';
import { IconButton, Loader, Popover, Select, Switch, Tooltip } from '~/components/ui';

import { fetchPackageAllDownloadsRecord } from '~/npm/api/package-all-downloads-record/fetch';
import type { PackageAllDownloadsRecordData } from '~/npm/api/package-all-downloads-record/types';
import { packageToFilename } from '~/npm/misc/package-to-filename';
import type { TPackageNameSchema } from '~/npm/schema';

import { fontFamilySans, v_cn2, v_cn6, v_cn8, v_cn9, v_cp2, v_cp9 } from '~/styles/utils';
import { dayjs } from '~/utils/dayjs';
import { formatNumber, formatNumberCompact } from '~/utils/formatter';

import { usePackageContext } from '~/contexts/package-context';

import { CHART_CURVE_LIST, QUARTER_INDEX_MAP, QUARTER_MM_DD_IN_RECORD_MAP, usePackageDownloadsSearchParams } from './chart.utils';

import { useDOMToPNG } from '~/primitives/use-dom-to-png';

const RenderChart = (props: { data: PackageAllDownloadsRecordData }) => {
	const pkg = usePackageContext();

	const [searchParams, setSearchParams] = usePackageDownloadsSearchParams();

	const dataDownloads = createMemo(() => {
		const searchParams_gb = searchParams.gb;

		const data_record = props.data.record;

		const record: Record<string, number> = {};

		let tempDateInRecord: string;

		for (const date in data_record) {
			if (searchParams_gb === 'm') {
				tempDateInRecord = date.slice(0, -3);
			} else if (searchParams_gb === 'q') {
				tempDateInRecord = `${date.slice(0, -6)}-${QUARTER_MM_DD_IN_RECORD_MAP[date.slice(5, -3)]}`;
			} else {
				tempDateInRecord = date.slice(0, -6);
			}

			record[tempDateInRecord] = (record[tempDateInRecord] ?? 0) + data_record[date];
		}

		const downloads: { x: Date; y: number }[] = [];

		for (tempDateInRecord in record) downloads.push({ x: new Date(tempDateInRecord), y: record[tempDateInRecord] });

		if (!searchParams.it) {
			const last = downloads.at(-1);

			const date = new Date();

			if (last) {
				if (searchParams_gb === 'm') {
					if (last.x.getMonth() === date.getMonth()) downloads.pop();
				} else if (searchParams_gb === 'q') {
					if (QUARTER_INDEX_MAP[dayjs(last.x).month()] === QUARTER_INDEX_MAP[dayjs(date).month()]) downloads.pop();
				} else {
					if (last.x.getFullYear() === date.getFullYear()) downloads.pop();
				}
			}
		}

		return downloads;
	});

	const totalDownloadsCount = createMemo(() => dataDownloads().reduce((a, b) => a + b.y, 0));

	const averageDownloadsCount = createMemo(() => Math.floor(totalDownloadsCount() / dataDownloads().length));

	let screenshotRef!: HTMLDivElement;
	let plotRef!: HTMLDivElement;

	const yAxisTickFormatter = (d: any) => formatNumberCompact(d);

	const titleTipFormatter = createMemo(() => (d: any) => {
		const searchParams_gb = searchParams.gb;
		const xDayjs = dayjs(d.x);
		return `${searchParams_gb === 'q' ? `Q${QUARTER_INDEX_MAP[xDayjs.month()]} ` : ''}${xDayjs.format(`${searchParams_gb === 'm' ? 'MMM ' : ''}YYYY`)}\n\n${formatNumber(d.y)}`;
	});

	const x = 'x';
	const y = 'y';

	let varPlotAxisX: Plot.CompoundMark;
	let varPlotGridY: Plot.RuleY;
	let varPlotRuleY: Plot.RuleY;

	const marks = createMemo(() => {
		const searchParams_gb = searchParams.gb;
		const searchParams_lc = searchParams.lc;

		const data = dataDownloads();

		return [
			Plot.axisX({
				anchor: 'bottom',
				ticks:
					searchParams_gb === 'm'
						? data.length > 60
							? '6 months'
							: data.length > 30
								? '3 months'
								: data.length > 20
									? '2 months'
									: 'month'
						: searchParams_gb === 'q'
							? data.length > 60
								? 'year'
								: data.length > 30
									? '6 months'
									: '3 months'
							: 'year',
			}),
			(varPlotAxisX ??= Plot.axisY({ anchor: 'left', ticks: 5, tickFormat: yAxisTickFormatter })),
			(varPlotGridY ??= Plot.gridY({ stroke: v_cn9, strokeDasharray: '1,2', strokeOpacity: 0.3 })),
			Plot.areaY(data, { x, y, curve: searchParams_lc, fill: v_cp2, fillOpacity: 0.07 }),
			Plot.lineY(data, { x, y, curve: searchParams_lc, stroke: v_cp9 }),
			Plot.ruleX(data, Plot.pointerX({ x, py: y, stroke: v_cn9 })),
			searchParams.sa ? Plot.ruleY([averageDownloadsCount()], { stroke: v_cn8, strokeDasharray: 5 }) : null,
			(varPlotRuleY ??= Plot.ruleY([0], { stroke: v_cn9 })),
			Plot.dot(data, Plot.pointerX({ x, y, stroke: v_cn9 })),
			Plot.tip(data, Plot.pointerX({ x, y, title: titleTipFormatter(), fill: v_cn2, stroke: v_cn6, fontSize: 13, textPadding: 10 })),
		];
	});

	const rerender = createMemo(() => () => {
		if (__DEV__) console.log('NPMPackageDownloads - RenderChart rerender');

		plotRef.firstChild?.remove();
		plotRef.append(
			Plot.plot({
				width: plotRef.clientWidth,
				height: plotRef.clientHeight,
				marks: marks(),
				label: null,
				style: {
					fontFamily: fontFamilySans,
				},
			})
		);
	});

	onMount(() => {
		createEffect(() => {
			rerender()();
		});

		createResizeObserver(plotRef, (_, el) => {
			if (el === plotRef) rerender()();
		});
	});

	onCleanup(() => {
		plotRef.firstChild?.remove();
	});

	const [saving, domToPNG] = useDOMToPNG(() => screenshotRef, { scale: 2.5 });

	return (
		<div class="flex flex-col gap-3 md:gap-4">
			<div class="shrink-0 flex justify-between gap-2 md:gap-3 px-2 md:px-3">
				<div class="flex flex-col opacity-90 hover:opacity-100">
					<NumberTicker value={totalDownloadsCount()} format={formatNumber} class="text-xl leading-normal text-cn-12 tabular-nums" />
					<div class="text-sm leading-none text-cn-11">total downloads</div>
				</div>

				<div class="flex items-center gap-1.5 md:gap-2.5">
					<Tooltip
						trigger={(props) => <IconButton {...props}>{saving() ? <Loader size="sm" /> : <LucideIcon i={ImageDown} />}</IconButton>}
						triggerProps={{
							onClick: async () => {
								await domToPNG(`npmxt - ${packageToFilename(pkg)}`);
							},
						}}
						placement="top"
					>
						{saving() ? 'Saving...' : 'Save PNG'}
					</Tooltip>

					<Popover
						trigger={(props) => (
							<Tooltip
								trigger={(props) => (
									<IconButton {...props}>
										<LucideIcon i={Settings2} />
									</IconButton>
								)}
								triggerProps={props}
								placement="top"
							>
								Chart settings
							</Tooltip>
						)}
						title="Settings"
						placement="right-start"
					>
						<div class="flex flex-col gap-4 my-2 p-2">
							<Select
								label="Group by"
								description="Downloads grouped by"
								options={[
									{
										label: 'monthly',
										value: 'm',
									},
									{
										label: 'quarterly',
										value: 'q',
									},
									{
										label: 'Yearly',
										value: 'y',
									},
								]}
								value={searchParams.gb}
								onChange={(gb) => {
									setSearchParams({ gb }, { replace: true });
								}}
							/>

							<Select
								label="Curve"
								description="Line chart curve"
								options={CHART_CURVE_LIST}
								value={searchParams.lc}
								onChange={(lc) => {
									setSearchParams({ lc }, { replace: true });
								}}
							/>

							<Switch
								label="Show average"
								checked={searchParams.sa}
								onChange={(checked) => {
									setSearchParams({ sa: checked ? 'y' : 'n' }, { replace: true });
								}}
							/>

							<Switch
								label={`Including this ${searchParams.gb === 'm' ? 'month' : searchParams.gb === 'q' ? 'quarter' : 'year'}`}
								checked={searchParams.it}
								onChange={(checked) => {
									setSearchParams({ it: checked ? 'y' : 'n' }, { replace: true });
								}}
							/>
						</div>
					</Popover>
				</div>
			</div>

			<div ref={screenshotRef} class="grow -m-2 md:-m-3 p-3 md:p-4 bg-cn-2 rounded-xl select-none">
				<div ref={plotRef} class="w-full aspect-[2/1]" />
			</div>
		</div>
	);
};

const queryPackageDownloadsChartData = query(async (name: TPackageNameSchema) => await fetchPackageAllDownloadsRecord(name), 'package-downloads-chart-data');

export default () => {
	const pkg = usePackageContext();

	const data = createAsync(() => queryPackageDownloadsChartData(pkg.name));

	return <Show when={data()}>{(data) => <RenderChart data={data()} />}</Show>;
};
