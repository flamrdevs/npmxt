import { json } from '@solidjs/router';

export const jsonBadRequest = (message = 'Bad Request') => json({ message }, { status: 400 });

export const jsonUnauthorized = (message = 'Unauthorized') => json({ message }, { status: 401 });

export const jsonNotImplemented = (message = 'Not Implemented') => json({ message }, { status: 501 });
