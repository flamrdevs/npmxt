import { type NavigateOptions, useSearchParams } from '@solidjs/router';

import type * as Plot from '@observablehq/plot';

export type TDownloadsGroupBy = (typeof DOWNLOADS_GROUP_BY_LIST)[number];
export const DOWNLOADS_GROUP_BY_LIST = ['m' /* monthly */, 'y' /* yearly */] as const satisfies string[];
const FALLBACK_DOWNLOADS_GROUP_BY = DOWNLOADS_GROUP_BY_LIST[0];
export const isDownloadsGroupBy = (value: unknown): value is TDownloadsGroupBy => typeof value === 'string' && DOWNLOADS_GROUP_BY_LIST.includes(value as TDownloadsGroupBy);
export const validDownloadsGroupBy = (value: unknown): TDownloadsGroupBy => (isDownloadsGroupBy(value) ? value : FALLBACK_DOWNLOADS_GROUP_BY);

export type TChartCurve = (typeof CHART_CURVE_LIST)[number];
export const CHART_CURVE_LIST = ['basis', 'cardinal', 'catmull-rom', 'linear', 'natural', 'step'] as const satisfies Plot.Curve[];
const FALLBACK_CHART_CURVE = CHART_CURVE_LIST[2];
export const isChartCurve = (value: unknown): value is TChartCurve => typeof value === 'string' && CHART_CURVE_LIST.includes(value as TChartCurve);
export const validChartCurve = (value: unknown): TChartCurve => (isChartCurve(value) ? value : FALLBACK_CHART_CURVE);

export const usePackageDownloadsSearchParams = () => {
	type RawParams = {
		gb?: string; // group by
		lc?: string; // line curve
		it?: string; // include this
	};

	const [searchParams, setSearchParams] = useSearchParams<RawParams>();

	const resetSearchParams = () => {
		setSearchParams({ gb: FALLBACK_DOWNLOADS_GROUP_BY, lc: FALLBACK_CHART_CURVE, it: 'y' } satisfies RawParams, { replace: true });
	};

	return [
		{
			get gb() {
				return validDownloadsGroupBy(searchParams.gb);
			},
			get lc() {
				return validChartCurve(searchParams.lc);
			},
			get it() {
				const it = searchParams.it;
				return typeof it === 'string' ? it === 'y' : true;
			},
		} satisfies {
			gb: TDownloadsGroupBy;
			lc: TChartCurve;
			it: boolean;
		},
		setSearchParams as (params: RawParams, options?: Partial<NavigateOptions>) => void,
		resetSearchParams,
	] as const;
};
