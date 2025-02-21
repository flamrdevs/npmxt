import { http, HttpResponse, delay } from 'msw';

import { dayjs } from '~/utils/dayjs';
import { range } from '~/utils/range';

import { DOWNLOAD_DATE_FORMAT } from '~/npm/const';
import {
	PACKAGE_DOWNLOADS_LAST_LIST,
	PACKAGE_DOWNLOADS_LAST_MAP,
	type TPackageDownloadsPointSchema,
	type TPackageDownloadsRangeSchema,
	type TPackageNameSchema,
	parseCachedPackageName,
	parsePackageDownloadsLast,
} from '~/npm/schema';
import { BASE_URL_API as NPM_BASE_URL_API } from '~/npm/url';

import { MOCK_PACKAGE } from '../registry.npmjs/handlers';

const MOCK_PACKAGE_DOWNLOAD_RANGE: Record<TPackageNameSchema, number | TPackageDownloadsRangeSchema['downloads']> = {
	[parseCachedPackageName('@klass/core')]: 1,
	[parseCachedPackageName('@kobalte/core')]: 1,
	[parseCachedPackageName('@solidjs/meta')]: 2,
	[parseCachedPackageName('@solidjs/router')]: 2,
	[parseCachedPackageName('@solidjs/start')]: 1,
	[parseCachedPackageName('npmxt')]: 1,
	[parseCachedPackageName('react')]: 5,
	[parseCachedPackageName('react-dom')]: 5,
	[parseCachedPackageName('solid-js')]: 2,
	[parseCachedPackageName('svelte')]: 3,
	[parseCachedPackageName('vue')]: 4,
	[parseCachedPackageName('looooooooo-oooooooo-oooooooooooooooong')]: 100,
	[parseCachedPackageName('@looooooooo/oooooooooooo-oooooooooooooooooooooooong')]: 10000,
};

const MIN_START_DATE_DAYJS = dayjs('2015-01-01' /* behind MIN_START_DOWNLOAD_DATE */, DOWNLOAD_DATE_FORMAT);

const generateDownloads = (() => {
	const now = dayjs().startOf('day');

	return (name: TPackageNameSchema, factor: number) => {
		if (name in MOCK_PACKAGE) {
			const result: TPackageDownloadsRangeSchema['downloads'] = [];

			let startDayjs = dayjs(MOCK_PACKAGE[name].time.created).startOf('day');

			if (startDayjs.isBefore(MIN_START_DATE_DAYJS)) startDayjs = MIN_START_DATE_DAYJS.clone();

			const diffDays = now.diff(startDayjs, 'days');

			for (let index = 0; index < diffDays; index++) {
				const min = (index + 1) * 9 * factor;
				const max = min * 5 * factor;

				result.push({
					downloads: range(min, max),
					day: startDayjs.clone().add(index, 'days').format(DOWNLOAD_DATE_FORMAT),
				});
			}

			return result;
		}

		throw new Error('msw - mocks npm packages not synchronized');
	};
})();

const getDownloadsRecord = (name: TPackageNameSchema) => {
	if (typeof MOCK_PACKAGE_DOWNLOAD_RANGE[name] === 'number') MOCK_PACKAGE_DOWNLOAD_RANGE[name] = generateDownloads(name, MOCK_PACKAGE_DOWNLOAD_RANGE[name]);
	const allDownloads = MOCK_PACKAGE_DOWNLOAD_RANGE[name];
	const record: {
		[key in 'start' | 'end']: string;
	} & {
		[key: string]: number;
	} = {
		start: allDownloads.at(0)?.day as string,
		end: allDownloads.at(-1)?.day as string,
	} as any;
	let day: string;
	let downloads: number;
	for ({ day, downloads } of allDownloads) record[day] = downloads;
	return record;
};

type DownloadType = 'point' | 'range';
const isValidDownloadType = (type: unknown): type is DownloadType => type === 'point' || type === 'range';

const isLastPeriod = (value: string) => PACKAGE_DOWNLOADS_LAST_LIST.some((last) => `last-${last}` === value);

const transformDownloadsByType = (type: DownloadType, downloads: TPackageDownloadsRangeSchema['downloads']) =>
	(type === 'point' ? downloads.reduce((a, { downloads }) => a + downloads, 0) : downloads) as any;

export default [
	http.get<{ type: string; period: string; 0: string }>(`${NPM_BASE_URL_API}/downloads/:type/:period/*`, async ({ params }) => {
		if (__MSW_DELAY__) await delay(1000);

		const typeParam = params['type'];
		const periodParam = params['period'];
		const nameParam = params['0'];

		if (!isValidDownloadType(typeParam)) throw HttpResponse.json({ error: `download ${typeParam} not implemented` }, { status: 501 });

		const validType = typeParam;

		if (isLastPeriod(periodParam)) {
			const last = parsePackageDownloadsLast(periodParam.slice(5));
			const lastLength = PACKAGE_DOWNLOADS_LAST_MAP[last];

			if (nameParam in MOCK_PACKAGE_DOWNLOAD_RANGE) {
				const name = nameParam as TPackageNameSchema;

				const allDownloadsRecord = getDownloadsRecord(name);

				const endDate = allDownloadsRecord.end;
				const startDayjs = dayjs(endDate).subtract(lastLength - 1, 'days');

				let tempDay: string;
				const lastYearDownloads: TPackageDownloadsRangeSchema['downloads'] = Array.from({ length: lastLength }).map((_, index) => {
					tempDay = startDayjs.clone().add(index, 'days').format(DOWNLOAD_DATE_FORMAT);
					return { downloads: allDownloadsRecord[tempDay] ?? 0, day: tempDay };
				});

				return HttpResponse.json(
					{
						start: lastYearDownloads.at(0)?.day as string,
						end: lastYearDownloads.at(-1)?.day as string,
						package: name,
						downloads: transformDownloadsByType(validType, lastYearDownloads),
					} satisfies TPackageDownloadsPointSchema | TPackageDownloadsRangeSchema,
					{ status: 200 }
				);
			}

			throw HttpResponse.json({ error: `package ${name} not found` }, { status: 404 });
		}

		const periodSplitted = periodParam.split(':');

		if (periodSplitted.length !== 2) throw HttpResponse.json({ error: 'period type not implemented' }, { status: 501 });

		const [startPeriod, endPeriod] = periodSplitted;

		let startDayjs = dayjs(startPeriod);
		let endDayjs = dayjs(endPeriod);

		if (startDayjs.isValid() && endDayjs.isValid()) {
			const now = dayjs().startOf('day');

			if (nameParam in MOCK_PACKAGE_DOWNLOAD_RANGE) {
				const name = nameParam as TPackageNameSchema;

				if (startDayjs.isBefore(MIN_START_DATE_DAYJS)) startDayjs = MIN_START_DATE_DAYJS.clone();
				if (endDayjs.isAfter(now)) endDayjs = now.clone();

				const diffDays = endDayjs.diff(startDayjs, 'days') + 1;

				const allDownloadsRecord = getDownloadsRecord(name);

				let tempDay: string;
				const periodDownloads: TPackageDownloadsRangeSchema['downloads'] = Array.from({ length: diffDays }).map((_, index) => {
					tempDay = startDayjs.clone().add(index, 'days').format(DOWNLOAD_DATE_FORMAT);
					return { downloads: allDownloadsRecord[tempDay] ?? 0, day: tempDay };
				});

				return HttpResponse.json(
					{
						start: periodDownloads.at(0)?.day as string,
						end: periodDownloads.at(-1)?.day as string,
						package: name,
						downloads: transformDownloadsByType(validType, periodDownloads),
					} satisfies TPackageDownloadsPointSchema | TPackageDownloadsRangeSchema,
					{ status: 200 }
				);
			}

			throw HttpResponse.json({ error: `package ${name} not found` }, { status: 404 });
		}

		throw HttpResponse.json({ error: 'invalid date' }, { status: 400 });
	}),
];
