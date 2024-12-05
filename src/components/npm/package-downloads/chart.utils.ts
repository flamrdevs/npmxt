import { type NavigateOptions, useLocation, useNavigate, useSearchParams } from '@solidjs/router';

import type * as Plot from '@observablehq/plot';

export type TDownloadsGroupBy = (typeof DOWNLOADS_GROUP_BY_LIST)[number];
export const DOWNLOADS_GROUP_BY_LIST = ['m' /* monthly */, 'q' /* quarterly */, 'y' /* yearly */] as const satisfies string[];
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
	] as const;
};

export const useResetSearchParams = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return () => {
		navigate(location.pathname, { scroll: false, resolve: false, replace: true });
	};
};

export const QUARTER_INDEX_MAP: Record<string, number> = {
	0: 1,
	1: 1,
	2: 1,
	3: 2,
	4: 2,
	5: 2,
	6: 3,
	7: 3,
	8: 3,
	9: 4,
	10: 4,
	11: 4,
};

export const QUARTER_MM_DD_IN_RECORD_MAP: Record<string, string> = {
	'01': '02-15',
	'02': '02-15',
	'03': '02-15',
	'04': '05-15',
	'05': '05-15',
	'06': '05-15',
	'07': '08-15',
	'08': '08-15',
	'09': '08-15',
	'10': '11-15',
	'11': '11-15',
	'12': '11-15',
};
