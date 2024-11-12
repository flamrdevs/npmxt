// @refresh reload
import { StartServer, createHandler } from '@solidjs/start/server';

import { getHTMLThemeProps } from '~/theme/utils.server';

if (__MSW__) (await import('~/mocks/server')).listen();

export default createHandler((event) => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="en" {...getHTMLThemeProps(event)}>
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
					{assets}
				</head>
				<body>
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
));
