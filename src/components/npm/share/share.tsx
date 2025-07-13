import { clientOnly } from '@solidjs/start';

import { Share2 } from 'lucide';

import { delay } from '~/utils/delay';

import { LucideIcon } from '../../icons';
import { IconButton, Popover, Separator, Tooltip } from '../../ui';

const QRCode = clientOnly(
	async () => {
		await delay(1000);
		return import('./qrcode.client');
	},
	{ lazy: true }
);
const Socials = clientOnly(
	async () => {
		await delay(1000);
		return import('./socials.client');
	},
	{ lazy: true }
);

export const NPMShare = () => {
	return (
		<Popover
			trigger={(props) => (
				<Tooltip
					trigger={(props) => (
						<IconButton {...props}>
							<LucideIcon i={Share2} />
						</IconButton>
					)}
					triggerProps={props}
					placement="top"
				>
					share
				</Tooltip>
			)}
			title="Share"
		>
			<div class="flex flex-col gap-4 my-2 p-2 min-w-40">
				<QRCode />

				<Separator />

				<Socials />
			</div>
		</Popover>
	);
};
