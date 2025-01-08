export const objectMap = <K extends PropertyKey, V, R>(object: Record<K, V>, fn: (value: V, key: K) => R) => {
	const result: R[] = [];
	let key: K;
	for (key in object) result.push(fn(object[key], key));
	return result;
};
