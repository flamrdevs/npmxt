'use server';

import { type SessionConfig, useSession } from 'vinxi/http';

type SessionData = {
	username: string;
};

const config: SessionConfig = {
	password: process.env.SESSION_PASSWORD,
};

export const getSession = () => useSession<SessionData>(config);

export const getSessionData = async (): Promise<SessionData | undefined> => {
	const { data } = await getSession();
	if (data.username) return data;
};

export const updateSession = async (data: Partial<SessionData>) => {
	const a = await getSession();
	await a.update(data);
};
