import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { ErrorBoundary, Suspense } from 'solid-js';

import { MetaProvider } from '@solidjs/meta';

import { AlertCircle } from 'lucide';

import { RenderStatusMessageError } from '~/components/error';
import { LucideIcon } from '~/components/icons';
import * as Meta from '~/components/meta';

import * as theme from '~/theme/setup';

import '~/styles/layer.css';
import '~/styles/fonts.css';
import '~/styles/app.css';

theme.setup();

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Meta.Base />
					<ErrorBoundary
						fallback={(error) => (
							<RenderStatusMessageError
								error={error}
								render={(message) => (
									<div class="flex items-center justify-center sm:pt-4 md:pt-10 xl:pt-24 sm:pb-3 md:pb-8 xl:pb-16">
										<div class="relative flex gap-2 md:gap-4 mx-0 sm:mx-5 md:mx-10 px-5 py-4 md:px-8 md:py-6 2xl:px-10 2xl:py-8 w-full max-w-[60rem] min-h-dvh sm:min-h-fit bg-ce-2 border border-transparent md:border-ce-6 rounded-none sm:rounded-3xl shadow-sm">
											<div class="p-1">
												<LucideIcon i={AlertCircle} class="text-ce-9" />
											</div>
											<div class="font-medium text-base lg:text-lg">{message}</div>
										</div>
									</div>
								)}
							/>
						)}
					>
						<Suspense>{props.children}</Suspense>
					</ErrorBoundary>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
