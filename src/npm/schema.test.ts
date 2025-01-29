import * as v from 'valibot';

import { parseCachedPackageName, parsePackageName } from './schema';

describe('parsePackageName & parseCachedPackageName', () => {
	it.for([
		//
		['solid-js'],
		['@solidjs/start'],
	])('valid - %s', async ([name]) => {
		expect(() => parsePackageName(name)).not.toThrow(v.ValiError);
		expect(() => parseCachedPackageName(name)).not.toThrow(v.ValiError);
	});

	it.for([
		//
		['@invalid-scope/'],
		['@scope/invalid name'],
		['@scope/invalid!name'],
		['@scope/invalid~name!'],
		['@scope/invalid@name'],
		['@scope/invalid#name'],
		['@scope/invalid/name'],
		['@scope/'],
		['@scope/invalid:name'],
		['@scope/invalid*name'],
		['@scope/invalid^name'],
		['@scope/invalid&name'],
		['@scope/invalid(name)'],
		['@scope/invalid{name}'],
		['`@scope/invalid'],
		['@scope/invalid;name'],
		['@scope/invalid,name'],
		['@scope/invalid<name>'],
	])('invalid - %s', async ([name]) => {
		expect(() => parsePackageName(name)).toThrow(v.ValiError);
		expect(() => parseCachedPackageName(name)).toThrow(v.ValiError);
	});
});
