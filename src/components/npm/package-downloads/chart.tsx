import { Show, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import { createAsync, query } from '@solidjs/router';

import { createResizeObserver } from '@solid-primitives/resize-observer';

import { ImageDown, Settings2 } from 'lucide';

import * as Plot from '@observablehq/plot';

import { ofetch } from 'ofetch';

import { domToPng } from 'modern-screenshot';

import { NumberTicker } from '~/components/effect/number-ticker';
import { LucideIcon } from '~/components/icons';
import { Button, IconButton, Loader, Popover, Select, Switch, Tooltip } from '~/components/ui';

import { DOWNLOAD_DATE_FORMAT } from '~/npm/const';
import { packageFilename } from '~/npm/misc/pkg-filename';
import { parsePackageName } from '~/npm/schema';
import { type PackageDownloadsRecord, getPackageAllDownloadsRecord } from '~/npm/utils.get';

import { fontFamilySans, v_cn2, v_cn6, v_cn9, v_cp2, v_cp9 } from '~/styles/utils';
import { createCacheStorage } from '~/utils/cache-storage';
import { dayjs } from '~/utils/dayjs';
import { formatNumber, formatNumberCompact } from '~/utils/formatter';

import { usePackageContext } from '~/contexts/package-context';

import { CHART_CURVE_LIST, usePackageDownloadsSearchParams } from './chart.utils';

const RenderChart = (props: { pkgdr: PackageDownloadsRecord }) => {
	const pkg = usePackageContext();

	const [searchParams, setSearchParams, resetSearchParams] = usePackageDownloadsSearchParams();

	const dataDownloads = createMemo(() => {
		const pkgdr_record = props.pkgdr.record;
		const isDownloadsGroupByMonthly = searchParams.gb === 'm';

		const record: Record<string, number> = {};

		let tempDate: string;

		for (const date in pkgdr_record) record[(tempDate = date.slice(0, isDownloadsGroupByMonthly ? -3 : -6))] = (record[tempDate] ?? 0) + pkgdr_record[date];

		const downloads: { x: Date; y: number }[] = [];

		for (tempDate in record) downloads.push({ x: new Date(tempDate), y: record[tempDate] });

		if (!searchParams.it) {
			const last = downloads.at(-1);

			const date = new Date();

			if (last) {
				if (isDownloadsGroupByMonthly) {
					if (last.x.getMonth() === date.getMonth()) downloads.pop();
				} else {
					if (last.x.getFullYear() === date.getFullYear()) downloads.pop();
				}
			}
		}

		return downloads;
	});

	const totalDownloadsCount = createMemo(() => dataDownloads().reduce((a, b) => a + b.y, 0));

	let screenshotRef!: HTMLDivElement;
	let plotRef!: HTMLDivElement;

	const yAxisTickFormatter = (d: any) => formatNumberCompact(d);

	const titleTipFormatter = createMemo(() => (d: any) => [dayjs(d.x).format(`${searchParams.gb === 'm' ? 'MMM ' : ''}YYYY`), formatNumber(d.y)].join('\n\n'));

	const x = 'x';
	const y = 'y';

	let varPlotAxisX: Plot.CompoundMark;
	let varPlotGridY: Plot.RuleY;
	let varPlotRuleY: Plot.RuleY;

	const marks = createMemo(() => {
		const data = dataDownloads();

		return [
			Plot.axisX({ anchor: 'bottom', ticks: searchParams.gb === 'm' ? (data.length > 60 ? '6 months' : data.length > 30 ? '3 months' : 'month') : 'year' }),
			(varPlotAxisX ??= Plot.axisY({ anchor: 'left', ticks: 7, tickFormat: yAxisTickFormatter })),
			(varPlotGridY ??= Plot.gridY({ stroke: v_cn9, strokeDasharray: '1,2', strokeOpacity: 0.3 })),
			Plot.areaY(data, { x, y, curve: searchParams.lc, fill: v_cp2, fillOpacity: 0.07 }),
			Plot.lineY(data, { x, y, curve: searchParams.lc, stroke: v_cp9 }),
			Plot.ruleX(data, Plot.pointerX({ x, py: y, stroke: v_cn9 })),
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

	const [savingImage, setSavingImage] = createSignal<boolean>(false);

	return (
		<div class="flex flex-col gap-3 md:gap-4">
			<div class="shrink-0 flex justify-between gap-2 md:gap-3 px-2 md:px-3">
				<div class="flex flex-col opacity-90 hover:opacity-100">
					<NumberTicker value={totalDownloadsCount()} format={formatNumber} class="text-xl leading-normal text-cn-12 tabular-nums" />
					<div class="text-sm leading-none text-cn-11">total downloads</div>
				</div>

				<div class="flex items-center gap-1.5 md:gap-2.5">
					<Tooltip
						trigger={(props) => <IconButton {...props}>{savingImage() ? <Loader size="sm" /> : <LucideIcon i={ImageDown} />}</IconButton>}
						triggerProps={{
							onClick: async () => {
								if (savingImage()) return;

								setSavingImage(true);

								const href = await domToPng(screenshotRef, { scale: 2.5 });

								if (__DEV__) await delay();

								const link = document.createElement('a');
								link.download = `npmxt - ${packageFilename(pkg)}.png`;
								link.href = href;
								link.click();

								setSavingImage(false);
							},
						}}
						placement="top"
					>
						{savingImage() ? 'Saving...' : 'Save PNG'}
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
								label={`Including this ${searchParams.gb === 'm' ? 'month' : 'year'}`}
								checked={searchParams.it}
								onChange={(checked) => {
									setSearchParams({ it: checked ? 'y' : 'n' }, { replace: true });
								}}
							/>

							<Button onClick={resetSearchParams}>Reset</Button>
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

const fetchPackageDownloadsRecord = (() => {
	const withStorage = createCacheStorage<PackageDownloadsRecord>(__DEV__ ? 'npm:package-downloads-record' : 'npm:pkg-dr-r');

	const MIN_START_DATE_DAYJS = dayjs('2015-02-01' /* ahead MIN_START_DOWNLOAD_DATE */, DOWNLOAD_DATE_FORMAT);

	return async (rawName: string): Promise<PackageDownloadsRecord> => {
		const validName = parsePackageName(rawName);

		return withStorage(validName, async () => {
			const createdDayjs = dayjs((await ofetch<{ date: string }>(`/api/package-creation/${validName}`)).date).startOf('day');

			return (await getPackageAllDownloadsRecord(
				validName,
				(createdDayjs.isBefore(MIN_START_DATE_DAYJS) ? MIN_START_DATE_DAYJS : createdDayjs).clone().format(DOWNLOAD_DATE_FORMAT)
			)) as unknown as PackageDownloadsRecord;
		});
	};
})();

const getPackageDownloadsRecord = query(async (name: string) => await fetchPackageDownloadsRecord(name), 'package-downloads-record');

export default () => {
	const pkg = usePackageContext();

	const pkgdr = createAsync(() => getPackageDownloadsRecord(pkg.name));

	return <Show when={pkgdr()}>{(pkgdr) => <RenderChart pkgdr={pkgdr()} />}</Show>;
};
