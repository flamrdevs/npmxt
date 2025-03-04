export type Options = {
	maxAge?: number;
	headers?: Record<string, any>;
};

export const createResponseInit = (contentType: string, { maxAge = __DEV__ ? 1 : 86400, headers = {} }: Options = {}) => {
	const cacheControl = `public, max-age=${maxAge}, s-maxage=${maxAge}, must-revalidate`;
	return {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': cacheControl,
			'CDN-Cache-Control': cacheControl,
			'Cross-Origin-Resource-Policy': 'cross-origin',
			...headers,
		},
	};
};
