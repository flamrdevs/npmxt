import { StatusError } from '~/utils/error';
import { fetchPackage, fetchPackageAlt, fetchPackageDownloadsPointLast, fetchPackageDownloadsRangeLast, fetchPackageMetadata, splitPackageNameAndVersion } from './utils';

describe('splitPackageNameAndVersion', () => {
	it('Parse package name', () => {
		expect(splitPackageNameAndVersion('solid-js')).toEqual(['solid-js', undefined]);
	});

	it('Parse package name & version', () => {
		expect(splitPackageNameAndVersion('solid-js/1.0.0')).toEqual(['solid-js', '1.0.0']);

		expect(splitPackageNameAndVersion('solid-js/next')).toEqual(['solid-js', 'next']);
	});

	it('Parse scope package name', () => {
		expect(splitPackageNameAndVersion('@solidjs/start')).toEqual(['@solidjs/start', undefined]);
	});

	it('Parse scope package name & version', () => {
		expect(splitPackageNameAndVersion('@solidjs/start/1.0.0')).toEqual(['@solidjs/start', '1.0.0']);

		expect(splitPackageNameAndVersion('@solidjs/start/next')).toEqual(['@solidjs/start', 'next']);
	});
});

describe('fetchPackage', () => {
	it.for([
		['solid-js', 'latest'],
		['solid-js', '1.0.0'],
		['solid-js', '2.0.0'],
		['@solidjs/start', 'latest'],
		['@solidjs/start', '1.0.0'],
		['@solidjs/start', '2.0.0'],
	])('found - %s@%s', async ([name, version]) => {
		await expect(fetchPackage(name, version)).resolves.toMatchObject({ name });
		await expect(fetchPackageAlt(`${name}/${version}`)).resolves.toMatchObject({ name });
	});

	it.for([
		['astro', 'latest'],
		['next', 'latest'],
		['nuxt', 'latest'],
	])('not found - %s@%s', async ([name, version]) => {
		await expect(fetchPackage(name, version)).rejects.toThrow(StatusError);
		await expect(fetchPackageAlt(`${name}/${version}`)).rejects.toThrow(StatusError);
	});
});

describe('fetchPackageMetadata', () => {
	it.for([['solid-js'], ['@solidjs/start']])('found - %s', async ([name]) => {
		await expect(fetchPackageMetadata(name)).resolves.toMatchObject({ name });
	});

	it.for([
		['astro', 'latest'],
		['next', 'latest'],
		['nuxt', 'latest'],
	])('not found - %s', async ([name]) => {
		await expect(fetchPackageMetadata(name)).rejects.toThrow(StatusError);
	});
});

describe('fetchPackageDownloadsPointLast', () => {
	it.for([
		//
		['solid-js', 'day'],
		['solid-js', 'week'],
		['solid-js', 'month'],
		['solid-js', 'year'],
		['@solidjs/start', 'day'],
		['@solidjs/start', 'week'],
		['@solidjs/start', 'month'],
		['@solidjs/start', 'year'],
	])('found - %s last-%s', async ([name, last]) => {
		await expect(fetchPackageDownloadsPointLast(name, last)).resolves.toMatchObject({
			package: name,
			start: expect.any(String),
			end: expect.any(String),
			downloads: expect.any(Number),
		});
	});

	it.for([
		//
		['astro'],
		['next'],
		['nuxt'],
	])('not found - %s last-week', async ([name]) => {
		await expect(fetchPackageDownloadsPointLast(name, 'week')).rejects.toThrow(StatusError);
	});
});

describe('fetchPackageDownloadsRangeLast', () => {
	it.for([
		//
		['solid-js', 'day'],
		['solid-js', 'week'],
		['solid-js', 'month'],
		['solid-js', 'year'],
		['@solidjs/start', 'day'],
		['@solidjs/start', 'week'],
		['@solidjs/start', 'month'],
		['@solidjs/start', 'year'],
	])('found - %s last-%s', async ([name, last]) => {
		await expect(fetchPackageDownloadsRangeLast(name, last)).resolves.toMatchObject({
			package: name,
			start: expect.any(String),
			end: expect.any(String),
			downloads: expect.any(Array),
		});
	});

	it.for([
		//
		['astro'],
		['next'],
		['nuxt'],
	])('not found - %s last-week', async ([name]) => {
		await expect(fetchPackageDownloadsRangeLast(name, 'week')).rejects.toThrow(StatusError);
	});
});
