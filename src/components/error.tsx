import { createMemo } from 'solid-js';

import { HttpStatusCode } from '@solidjs/start';

import { errorStatusMessage } from '~/utils/error';

export const RenderStatusMessageError = (props: {
	error: any;
	render?: (message: string) => Solid.JSX.Element;
}) =>
	createMemo(() => {
		const { status, message } = errorStatusMessage(props.error);

		return (
			<>
				<HttpStatusCode code={status} />
				{props.render?.(message)}
			</>
		);
	}) as unknown as Solid.JSX.Element;
