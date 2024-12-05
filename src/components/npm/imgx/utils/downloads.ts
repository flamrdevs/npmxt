import { PACKAGE_DOWNLOADS_LAST_MAP, type TPackageDownloadsRangeSchema } from '~/npm/schema';

export const getChartSimpleLastMonthDownloadsData = (downloads: TPackageDownloadsRangeSchema['downloads']) => {
	const data: number[] = []; // 30
	let total = 0; // 30

	let indexDownloads: number;

	for (let index = 0; index < PACKAGE_DOWNLOADS_LAST_MAP.month; index++) {
		total += indexDownloads = downloads[index].downloads;
		data.push(indexDownloads);
	}

	return [data, total] as const;
};

export const getChartSimpleLastYearDownloadsData = (downloads: TPackageDownloadsRangeSchema['downloads'], groupSize: 7 | 14 = 14) => {
	const data: number[] = []; // 364
	let total = downloads[0].downloads; // 365

	let pushToData = 0;
	let iterGroup = 0;

	let indexDownloads: number;

	for (let index = 1; index < PACKAGE_DOWNLOADS_LAST_MAP.year; index++) {
		total += indexDownloads = downloads[index].downloads;
		pushToData += indexDownloads;
		iterGroup++;
		if (iterGroup === groupSize) {
			data.push(pushToData);
			pushToData = 0;
			iterGroup = 0;
		}
	}

	return [data, total] as const;
};
