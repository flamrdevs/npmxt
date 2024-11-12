import { action, redirect } from '@solidjs/router';
import { For, createSignal } from 'solid-js';

import { Motion } from 'solid-motionone';

import { ChartLine, PackageSearch } from 'lucide';

import { LucideIcon } from '~/components/icons';
import * as Meta from '~/components/meta';
import { IconButton, TextField, Tooltip } from '~/components/ui';

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

export default function IndexPage() {
	return (
		<>
			<Meta.Page />

			<div>
				<div class="relative isolate px-5 md:px-6 lg:px-8 pt-11 md:pt-14">
					<div class="absolute inset-x-0 top-36 md:top-24 xl:top-12 -z-20 transform-gpu flex items-center justify-center overflow-hidden">
						<div
							class="font-bold text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[20rem] xl:text-[26rem] 2xl:text-[32rem] text-cn-1"
							style={{
								'text-shadow': '0px 0px 2px hsl(var(--c-n-6))',
							}}
						>
							<For
								each={[
									{ v: 'n', x: -50 },
									{ v: 'p', x: -20 },
									{ v: 'm', x: 0 },
									{ v: 'x', x: 20 },
									{ v: 't', x: 50 },
								]}
							>
								{({ v, x }) => (
									<Motion.span class="inline-block" initial={{ x, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 2, easing: [0.16, 1, 0.3, 1] }}>
										{v}
									</Motion.span>
								)}
							</For>
						</div>
					</div>

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
