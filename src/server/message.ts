import { json } from '@solidjs/router';

export const jsonNotImplemented = (message = 'Not Implemented') => json({ message }, { status: 501 });
