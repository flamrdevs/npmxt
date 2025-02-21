import { useLocation } from '@solidjs/router';
import { createEffect, createMemo, createSignal, createUniqueId } from 'solid-js';

import * as qrCode from '@zag-js/qr-code';
import { normalizeProps, useMachine } from '@zag-js/solid';

import { ImageDown } from 'lucide';

import { domToPng } from 'modern-screenshot';

import { LucideIcon } from '~/components/icons';
import { Button } from '~/components/ui';

import { usePackageContext } from '~/contexts/package-context';

import { packageFilename } from '~/npm/misc/pkg-filename';

import { delay } from '~/utils/delay';
import { NPMXT } from '~/utils/url';

export default () => {
	const location = useLocation();

	const pkg = usePackageContext();

	const getValue = (pathname: string, search: string) => `${NPMXT}${pathname}${search}`;

	const [state, send] = useMachine(
		qrCode.machine({
			id: createUniqueId(),
			value: getValue(location.pathname, location.search),
			encoding: {
				ecc: 'H',
			},
		})
	);

	const api = createMemo(() => qrCode.connect(state, send, normalizeProps));

	createEffect(() => {
		api().setValue(getValue(location.pathname, location.search));
	});

	let screenshotRef!: HTMLDivElement;

	const [savingImage, setSavingImage] = createSignal<boolean>(false);

	return (
		<div class="flex flex-col gap-2 md:gap-3">
			<div ref={screenshotRef}>
				<div {...api().getRootProps()} class="p-1 md:p-2 size-40 md:size-44 xl:size-48 bg-cn-1 dark:bg-cn-12 rounded-lg">
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: prefer no title */}
					<svg {...api().getFrameProps()} class="bg-cn-1 dark:bg-cn-12">
						<path {...api().getPatternProps()} class="fill-cn-12 dark:fill-cn-1" />
					</svg>
				</div>
			</div>

			<Button
				size="sm"
				onClick={async () => {
					if (savingImage()) return;

					setSavingImage(true);

					const href = await domToPng(screenshotRef, { scale: 2 });

					if (__DEV__) await delay();

					const link = document.createElement('a');
					link.download = `npmxt (qrcode) - ${packageFilename(pkg)}.png`;
					link.href = href;
					link.click();

					setSavingImage(false);
				}}
			>
				<LucideIcon i={ImageDown} class="mr-2 size-5" />
				<span>Save QR code</span>
			</Button>
		</div>
	);
};
