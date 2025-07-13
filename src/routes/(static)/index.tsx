import { Suspense, createSignal } from 'solid-js';

import { action, redirect } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';

import { ChartLine, PackageSearch } from 'lucide';

import { LucideIcon } from '~/components/icons';
import * as Meta from '~/components/meta';
import { Button, IconButton, Popover, TextField, Tooltip } from '~/components/ui';

const packageAction = action(async (formData: FormData) => redirect(`/package/${formData.get('pkg')}`), 'package-action');
const downloadsAction = action(async (formData: FormData) => redirect(`/downloads/${formData.get('pkg')}`), 'downloads-action');

const SearchPackage = () => {
	const [pkg, setPkg] = createSignal<string>('');

	return (
		<div class="flex items-center justify-center gap-x-2 md:gap-x-3 mt-8 md:mt-10">
			<form action={packageAction} method="post" class="flex items-center gap-x-2 md:gap-x-3">
				<TextField placeholder="Search package..." name="pkg" value={pkg()} onChange={setPkg} />

				<Tooltip
					trigger={(props) => (
						<IconButton {...props} type="submit" value={pkg()} color="p">
							<LucideIcon i={PackageSearch} class="size-6" />
						</IconButton>
					)}
				>
					Package
				</Tooltip>
			</form>
			<form action={downloadsAction} method="post">
				<Tooltip
					trigger={(props) => (
						<IconButton {...props} type="submit" name="pkg" value={pkg()} color="n">
							<LucideIcon i={ChartLine} class="size-6" />
						</IconButton>
					)}
				>
					Downloads
				</Tooltip>
			</form>
		</div>
	);
};

const IndexNPMXTClient = clientOnly(() => import('~/components/routes/index/npmxt.client'), { lazy: true });

export default function IndexPage() {
	return (
		<>
			<Meta.Page />

			<div>
				<div class="relative isolate px-5 md:px-6 lg:px-8 pt-11 md:pt-14">
					<Suspense>
						<IndexNPMXTClient />
					</Suspense>

					<div class="absolute inset-x-0 -top-24 sm:-top-48 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
						<div
							class="relative left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] w-[36rem] sm:w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-cn-9 to-cp-9 opacity-30 aspect-video"
							style={{ 'clip-path': 'polygon(86% 92%, 44% 49%, 36% 95%, 5% 65%, 36% 52%, 20% 13%, 63% 43%, 80% 10%, 75% 56%)' }}
						/>
					</div>

					<div class="mx-auto py-20 sm:py-32 lg:py-40">
						<div class="text-center">
							<h1 class="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight text-cn-12 text-center text-nowrap">npm e-xtended tools</h1>
							<p class="mx-auto max-w-xl mt-7 md:mt-8 font-medium text-pretty text-lg lg:text-xl text-cn-11">
								Supercharge your development with npm e-xtended tools - essential utilities to boost productivity.
							</p>
							<SearchPackage />

							<p class="group mt-8 md:mt-9 lg:mt-10 text-xs">
								<span class="text-cn-7 group-hover:text-cn-9">Source code on </span>
								<a
									href="https://github.com/flamrdevs/npmxt"
									target="_blank"
									rel="noreferrer"
									class="focus-visible:outline-1 text-cp-7 group-hover:text-cp-9 focus-visible:text-cp-9 focus-visible:outline-cp-9"
								>
									GitHub
								</a>
							</p>

							<Popover
								trigger={(triggerProps) => (
									<button type="button" {...triggerProps} class="focus-visible:outline-1 text-xs text-cp-7 hover:text-cp-9 rounded-lg focus-visible:outline-cp-9 cursor-pointer">
										Support me
									</button>
								)}
								title="Support me ❤️"
							>
								<div class="flex flex-col gap-2 mt-3 mb-1 min-w-40">
									<Button as="a" href="https://buymeacoffee.com/flamrdevs" target="_blank" rel="noopener noreferrer" size="sm" class="justify-start gap-2 pl-2 pr-3 w-full">
										<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="size-4 fill-current">
											<title>Buy Me A Coffee</title>
											<path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z" />
										</svg>
										<span>Buy Me a Coffee</span>
									</Button>
									<Button as="a" href="https://paypal.me/flamrdevs" target="_blank" rel="noopener noreferrer" size="sm" class="justify-start gap-2 pl-2 pr-3 w-full">
										<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="size-4 fill-current">
											<title>PayPal</title>
											<path d="M7.016 19.198h-4.2a.562.562 0 0 1-.555-.65L5.093.584A.692.692 0 0 1 5.776 0h7.222c3.417 0 5.904 2.488 5.846 5.5-.006.25-.027.5-.066.747A6.794 6.794 0 0 1 12.071 12H8.743a.69.69 0 0 0-.682.583l-.325 2.056-.013.083-.692 4.39-.015.087zM19.79 6.142c-.01.087-.01.175-.023.261a7.76 7.76 0 0 1-7.695 6.598H9.007l-.283 1.795-.013.083-.692 4.39-.134.843-.014.088H6.86l-.497 3.15a.562.562 0 0 0 .555.65h3.612c.34 0 .63-.249.683-.585l.952-6.031a.692.692 0 0 1 .683-.584h2.126a6.793 6.793 0 0 0 6.707-5.752c.306-1.95-.466-3.744-1.89-4.906z" />
										</svg>
										<span>PayPal</span>
									</Button>
								</div>
							</Popover>
						</div>
					</div>

					<div class="absolute inset-x-0 top-[calc(100%-13rem)] sm:top-[calc(100%-30rem)] -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
						<div
							class="relative left-[calc(50%+3rem)] sm:left-[calc(50%+36rem)] w-[36rem] sm:w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-cn-9 to-cp-9 opacity-30 aspect-video"
							style={{ 'clip-path': 'polygon(50% 83%, 17% 92%, 46% 49%, 15% 45%, 36% 13%, 64% 35%, 50% 66%, 88% 85%, 61% 95%)' }}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
