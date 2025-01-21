import { createAsync, useParams } from '@solidjs/router';
import { ErrorBoundary, Show, Suspense, createEffect } from 'solid-js';

import { AlertCircle } from 'lucide';

import { NPMPackageDownloads } from '~/components/npm/package-downloads';

import { RenderStatusMessageError } from '~/components/error';
import { LucideIcon } from '~/components/icons';
import * as Meta from '~/components/meta';
import { Loader } from '~/components/ui';

import { PackageContextProvider } from '~/contexts/package-context';

import { queryPackage } from '~/npm/queries';

const Blobs = () => {
	return (
		<>
			<div class="absolute inset-x-0 top-64 sm:top-80 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
				<div
					class="relative left-[calc(50%-22rem)] w-[40rem] sm:w-[56rem] -translate-x-1/2 bg-gradient-to-tr from-cn-9 to-cp-9 opacity-25 aspect-video"
					style={{ 'clip-path': 'polygon(86% 92%, 44% 49%, 36% 95%, 5% 65%, 36% 52%, 20% 13%, 63% 43%, 80% 10%, 75% 56%)' }}
				/>
			</div>

			<div class="absolute inset-x-0 top-1 sm:top-2 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
				<div
					class="relative left-[calc(50%+28rem)] w-[40rem] sm:w-[56rem] -translate-x-1/2 bg-gradient-to-tr from-cn-9 to-cp-9 opacity-25 aspect-video"
					style={{ 'clip-path': 'polygon(50% 83%, 17% 92%, 46% 49%, 15% 45%, 36% 13%, 64% 35%, 50% 66%, 88% 85%, 61% 95%)' }}
				/>
			</div>
		</>
	);
};

export default function Downloads$NamePage() {
	const params = useParams();

	const pkg = createAsync(() => queryPackage(params.name));

	if (__DEV__) {
		createEffect(() => {
			console.log({ pkg: pkg() });
		});
	}

	return (
		<>
			<Blobs />

			<ErrorBoundary
				fallback={(error) => {
					if (__DEV__) console.error('Downloads$NamePage', error);
					return (
						<RenderStatusMessageError
							error={error}
							render={(message) => (
								<div class="flex items-center justify-center sm:pt-4 md:pt-10 xl:pt-24 sm:pb-3 md:pb-8 xl:pb-16">
									<div class="relative flex gap-2 md:gap-4 mx-0 sm:mx-5 md:mx-10 px-5 py-4 md:px-8 md:py-6 2xl:px-10 2xl:py-8 w-full max-w-[60rem] min-h-dvh sm:min-h-fit bg-ce-2 border border-transparent md:border-ce-6 rounded-none sm:rounded-3xl shadow">
										<div class="p-1">
											<LucideIcon i={AlertCircle} class="text-ce-9" />
										</div>
										<div class="font-medium text-base lg:text-lg">{message}</div>
									</div>
								</div>
							)}
						/>
					);
				}}
			>
				<Suspense
					fallback={
						<div class="flex items-center justify-center min-h-[30rem] text-cn-12">
							<Loader />
						</div>
					}
				>
					<Show when={pkg()} keyed>
						{(pkg) => (
							<>
								<Meta.Page title={`${pkg.name} - downloads`} description={`${pkg.description || pkg.name} - downloads statistics`} img={`downloads/${pkg.name}`} />

								<div class="flex items-center justify-center sm:pt-4 md:pt-10 xl:pt-24 sm:pb-3 md:pb-8 xl:pb-16">
									<PackageContextProvider value={pkg}>
										<NPMPackageDownloads />
									</PackageContextProvider>
								</div>
							</>
						)}
					</Show>
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
