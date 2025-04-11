import { dayjs } from '~/utils/dayjs';
import { entriesMap } from '~/utils/object';

import { DOWNLOAD_DATE_FORMAT, MAX_DOWNLOAD_RANGE_DAYS } from '../../const';
import { fetcherPackageDownloadsRange } from '../../fetcher';
import { PACKAGE_DOWNLOADS_LAST_MAP, type TPackageNameSchema, parsePackageDownloadsRange } from '../../schema';
import { fetchPackageDownloadsRangeLast } from '../../utils';

import { fetchPackageCreation } from '../package-creation/fetch';

import type { PackageAllDownloadsRecordData } from './types';

const getValidStartDate = (() => {
	const MIN_START_DATE_DAYJS = dayjs('2015-02-01' /* ahead MIN_START_DOWNLOAD_DATE */, DOWNLOAD_DATE_FORMAT);

	return async (validPackageName: TPackageNameSchema) => {
		const createdDayjs = dayjs((await fetchPackageCreation(validPackageName)).date).startOf('day');

		return (createdDayjs.isBefore(MIN_START_DATE_DAYJS) ? MIN_START_DATE_DAYJS : createdDayjs).clone().format(DOWNLOAD_DATE_FORMAT);
	};
})();

export const handlePackageAllDownloadsRecord = async (validPackageName: TPackageNameSchema): Promise<PackageAllDownloadsRecordData> => {
	const validStartDate = await getValidStartDate(validPackageName);
	const startDayjs = dayjs(validStartDate, DOWNLOAD_DATE_FORMAT);

	const lastYear = await fetchPackageDownloadsRangeLast(validPackageName, 'year');

	const endDate = lastYear.end;
	const endDayjs = dayjs(endDate, DOWNLOAD_DATE_FORMAT);

	const rangeDays = endDayjs.diff(startDayjs, 'days') + 1;

	const record: Record<string, number> = {};

	let index: number;
	let tempDay: string;
	let tempDownloads: number;

	if (rangeDays /* is > 365 */ > PACKAGE_DOWNLOADS_LAST_MAP.year) {
		const map: Record<string /* start */, string /* end */> = {};
		const parts = Math.floor((rangeDays - PACKAGE_DOWNLOADS_LAST_MAP.year) / MAX_DOWNLOAD_RANGE_DAYS);

		let tempStart: dayjs.Dayjs;
		for (let i = 0; i < parts; i++) {
			map[(tempStart = startDayjs.clone().add(i * MAX_DOWNLOAD_RANGE_DAYS, 'days')).format(DOWNLOAD_DATE_FORMAT)] = tempStart
				.clone()
				.add(MAX_DOWNLOAD_RANGE_DAYS - 1, 'days')
				.format(DOWNLOAD_DATE_FORMAT);
		}
		map[(tempStart = startDayjs.clone().add(parts * MAX_DOWNLOAD_RANGE_DAYS, 'days')).format(DOWNLOAD_DATE_FORMAT)] = tempStart
			.clone()
			.add(dayjs(lastYear.start).subtract(1, 'days').diff(tempStart, 'days'), 'days')
			.format(DOWNLOAD_DATE_FORMAT);

		const bulks = await Promise.all(entriesMap(map, ([start, end]) => fetcherPackageDownloadsRange(`${start}:${end}`, validPackageName)));
		for (const bulk of bulks) {
			const { downloads } = parsePackageDownloadsRange(bulk);
			for ({ day: tempDay, downloads: tempDownloads } of downloads) record[tempDay] = tempDownloads;
		}
		for (index = 0; index < PACKAGE_DOWNLOADS_LAST_MAP.year; index++) {
			({ day: tempDay, downloads: tempDownloads } = lastYear.downloads[index]);
			record[tempDay] = tempDownloads;
		}
	} else {
		for (index = PACKAGE_DOWNLOADS_LAST_MAP.year - rangeDays; index < PACKAGE_DOWNLOADS_LAST_MAP.year; index++) {
			({ day: tempDay, downloads: tempDownloads } = lastYear.downloads[index]);
			record[tempDay] = tempDownloads;
		}
	}

	return {
		name: validPackageName,
		start: validStartDate,
		end: endDate,
		record,
	};
};
