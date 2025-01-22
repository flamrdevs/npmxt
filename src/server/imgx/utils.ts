import { cacheControl } from '../header';

export type Options = {
	maxAge?: number;
	headers?: Record<string, any>;
};

export const createResponseInit = (contentType: string, { maxAge = __DEV__ ? 1 : 86400, headers = {} }: Options = {}) => {
	return {
		headers: {
			'Content-Type': contentType,
			...cacheControl(`public, durable, max-age=${maxAge}, s-maxage=${maxAge}, must-revalidate`),
			'Cross-Origin-Resource-Policy': 'cross-origin',
			...headers,
		},
	};
};
