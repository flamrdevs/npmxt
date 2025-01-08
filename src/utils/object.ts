export const entriesMap = <K extends string, V, R>(object: Record<K, V>, callbackfn: (value: [K, V], index: number, array: [K, V][]) => R) => Object.entries<V>(object).map<R>(callbackfn as any);
