import { createMemo, createUniqueId } from 'solid-js';
import { useLocation } from '@solidjs/router';

import * as zagQRCode from '@zag-js/qr-code';
import * as zag from '@zag-js/solid';

import { NPMXT } from '~/utils/url';

export default () => {
	const location = useLocation();

	const serviceQRCode = zag.useMachine(zagQRCode.machine, {
		id: createUniqueId(),
		defaultValue: `${NPMXT}${location.pathname}${location.search}`,
		encoding: {
			ecc: 'H',
		},
	});

	const apiQRCode = createMemo(() => zagQRCode.connect(serviceQRCode, zag.normalizeProps));

	return (
		<div class="flex flex-col gap-2 md:gap-3">
			<div>
				<div {...apiQRCode().getRootProps()} class="p-1 md:p-2 size-40 md:size-44 xl:size-48 bg-cn-1 dark:bg-cn-12 rounded-lg">
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: prefer no title */}
					<svg {...apiQRCode().getFrameProps()} class="bg-cn-1 dark:bg-cn-12">
						<path {...apiQRCode().getPatternProps()} class="fill-cn-12 dark:fill-cn-1" />
					</svg>
				</div>
			</div>
		</div>
	);
};
