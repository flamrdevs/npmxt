type Env = {
	readonly TURSO_DATABASE_URL: string;
	readonly TURSO_AUTH_TOKEN: string;
};

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Env {}
	}
}

export {};
