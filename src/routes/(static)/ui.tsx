import { HttpHeader } from '@solidjs/start';
import { For } from 'solid-js';

import * as KLink from '@kobalte/core/link';

import { Palette } from 'lucide';

import { LucideIcon } from '~/components/icons';
import * as Meta from '~/components/meta';
import { Button, IconButton, Popover } from '~/components/ui';

import { blocks } from '~/components/routes/ui/blocks';

import { changeMode, mode } from '~/theme/state/state';

export default function UIPage() {
	return (
		<>
			<HttpHeader name="x-robots-tag" value="noindex" />

			<Meta.Page title="UI" description="UI npmxt" img="ui" />

			<div class="w-full max-w-5xl mx-auto p-2">
				<div class="flex items-center justify-end p-2">
					<Popover
						trigger={(triggerProps) => (
							<IconButton {...triggerProps} title="Palette">
								<LucideIcon i={Palette} />
							</IconButton>
						)}
						title="Mode"
					>
						<div class="flex items-center gap-2 p-2 min-w-40">
							<Button color={mode() === 'light' ? 'p' : 'n'} class="w-24" onClick={() => changeMode('light')}>
								light
							</Button>
							<Button color={mode() === 'dark' ? 'p' : 'n'} class="w-24" onClick={() => changeMode('dark')}>
								dark
							</Button>
						</div>
					</Popover>
				</div>
			</div>

			<main class="flex flex-col gap-6 w-full max-w-5xl mx-auto p-2">
				<For each={blocks}>
					{([name, Component]) => (
						<section class="px-2 py-3">
							<KLink.Root href={`#${name}`} class="block mb-3 font-bold text-3xl select-none">
								{name}
							</KLink.Root>
							<div class="p-1">
								<Component />
							</div>
						</section>
					)}
				</For>
			</main>
		</>
	);
}
