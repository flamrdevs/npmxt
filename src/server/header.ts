export const cacheControl = (value: string) => ({
	'Cache-Control': value,
	'CDN-Cache-Control': value,
	'Netlify-CDN-Cache-Control': value,
});
