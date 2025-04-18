// @refresh reload
import { StartServer, createHandler } from '@solidjs/start/server';

import * as theme from '~/theme/script';

if (__MSW__) (await import('~/mocks/server')).listen();

export default createHandler(
	() => (
		<StartServer
			document={({ assets, children, scripts }) => (
				<html lang="en">
					<head>
						<meta charset="utf-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
						<link rel="icon" href="/favicon.ico" />
						{assets}

						<theme.Script />
					</head>
					<body>
						<div id="app">{children}</div>
						{scripts}
					</body>
				</html>
			)}
		/>
	),
	{
		mode: 'async',
	}
);
