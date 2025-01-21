import { cacheControl } from '~/server/header';

export default {
	headers: {
		...cacheControl('public, durable, max-age=43200, s-maxage=43200, must-revalidate' /* 12 hours */),
	},
};
