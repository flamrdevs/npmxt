export const log = () => {
	const prefix = 'VERCEL';
	const keys = ['_ENV', '_TARGET_ENV', '_URL', '_BRANCH_URL'];

	for (const key of keys) {
		const env = `${prefix}${key}`;
		console.log(`[${env}] = ${process.env[env]}`);
	}
};
