import type { TPackageDownloadsRangeSchema } from '~/npm/schema';

export const chartDataLastYearDownloads = (downloads: TPackageDownloadsRangeSchema['downloads'], perDays: number | undefined = 14) => {
	const data: number[] = [];
	let total = 0;

	const downloadsLength = downloads.length;

	let pushDownloads = 0;
	let iterPer = 0;

	let indexDownloads: number;
	for (let index = downloadsLength % perDays; index < downloadsLength; index++) {
		total += indexDownloads = downloads[index].downloads;
		pushDownloads += indexDownloads;
		iterPer++;
		if (iterPer === perDays) {
			data.push(pushDownloads);
			pushDownloads = 0;
			iterPer = 0;
		}
	}

	return [data, total] as const;
};
