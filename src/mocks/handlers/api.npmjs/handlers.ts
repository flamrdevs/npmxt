import { http, HttpResponse, delay } from 'msw';

import { dayjs } from '~/utils/dayjs';

import { DOWNLOAD_DATE_FORMAT } from '~/npm/const';
import { PACKAGE_DOWNLOADS_LAST_LIST, PACKAGE_DOWNLOADS_LAST_MAP, type TPackageDownloadsPointSchema, type TPackageDownloadsRangeSchema, parsePackageDownloadsLast } from '~/npm/schema';
import { BASE_URL_API as NPM_BASE_URL_API } from '~/npm/url';

import { MOCK_PACKAGE } from '../registry.npmjs/handlers';

const MOCK_PACKAGE_DOWNLOAD_RANGE: Record<string, number | TPackageDownloadsRangeSchema['downloads']> = {
	['@klass/core']: 1,
	['@kobalte/core']: 1,
	['@solidjs/meta']: 2,
	['@solidjs/router']: 2,
	['@solidjs/start']: 1,
	['npmxt']: 1,
	['react']: 5,
	['react-dom']: 5,
	['solid-js']: 2,
	['svelte']: 3,
	['vue']: 4,
	['looooooooo-oooooooo-oooooooooooooooong']: 100,
	['@looooooooo/oooooooooooo-oooooooooooooooooooooooong']: 10000,
};

const MIN_START_DATE_DAYJS = dayjs('2015-01-01' /* behind MIN_START_DOWNLOAD_DATE */, DOWNLOAD_DATE_FORMAT);

const generateDownloads = (() => {
	const now = dayjs().startOf('day');

	return (name: string, factor: number) => {
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

const getDownloadsRecord = (name: string) => {
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

const isLastPeriod = (() => {
	const list = PACKAGE_DOWNLOADS_LAST_LIST.map((last) => `last-${last}`);
	return (value: string) => list.includes(value);
})();

const transformDownloadsByType = (type: DownloadType, downloads: TPackageDownloadsRangeSchema['downloads']) =>
	(type === 'point' ? downloads.reduce((a, { downloads }) => a + downloads, 0) : downloads) as any;

export default [
	http.get<{ type: string; period: string; 0: string }>(`${NPM_BASE_URL_API}/downloads/:type/:period/*`, async ({ params }) => {
		if (__MSW_DELAY__) await delay(1000);

		const type = params['type'];

		const period = params['period'];
		const name = params['0'];

		if (!isValidDownloadType(type)) throw HttpResponse.json({ error: `download ${type} not implemented` }, { status: 501 });

		if (isLastPeriod(period)) {
			const last = parsePackageDownloadsLast(period.slice(5));
			const lastLength = PACKAGE_DOWNLOADS_LAST_MAP[last];

			if (name in MOCK_PACKAGE_DOWNLOAD_RANGE) {
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
						downloads: transformDownloadsByType(type, lastYearDownloads),
					} satisfies TPackageDownloadsPointSchema | TPackageDownloadsRangeSchema,
					{ status: 200 }
				);
			}

			throw HttpResponse.json({ error: `package ${name} not found` }, { status: 404 });
		}

		const periodSplitted = period.split(':');

		if (periodSplitted.length !== 2) throw HttpResponse.json({ error: 'period type not implemented' }, { status: 501 });

		const [startPeriod, endPeriod] = periodSplitted;

		let startDayjs = dayjs(startPeriod);
		let endDayjs = dayjs(endPeriod);

		if (startDayjs.isValid() && endDayjs.isValid()) {
			const now = dayjs().startOf('day');

			if (name in MOCK_PACKAGE_DOWNLOAD_RANGE) {
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
						downloads: transformDownloadsByType(type, periodDownloads),
					} satisfies TPackageDownloadsPointSchema | TPackageDownloadsRangeSchema,
					{ status: 200 }
				);
			}

			throw HttpResponse.json({ error: `package ${name} not found` }, { status: 404 });
		}

		throw HttpResponse.json({ error: 'invalid date' }, { status: 400 });
	}),
];
