import { useLocation } from '@solidjs/router';

import { type Network, createSocialShare } from '@solid-primitives/share';

import { IconButton, Tooltip } from '~/components/ui';

import { usePackageContext } from '~/contexts/package-context';

import { NPMXT } from '~/utils/url';

const BLUESKY: Network = 'https://bsky.app/intent/compose?text=@t \n @u';
const X: Network = 'https://twitter.com/intent/tweet?text=@t&url=@u&hashtags=@h';

export default () => {
	const location = useLocation();

	const pkg = usePackageContext();

	const [share] = createSocialShare(() => ({
		title: `${pkg.name}`,
		url: `${NPMXT}${location.pathname}${location.search}`,
		description: pkg.description || `see ${pkg.name} on npmxt`,
		hashtags: 'npmxt',
	}));

	return (
		<div class="flex items-center gap-1.5 md:gap-2.5">
			<Tooltip
				trigger={(props) => (
					<IconButton {...props}>
						<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="fill-cn-10">
							<title>Bluesky</title>
							<path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
						</svg>
					</IconButton>
				)}
				triggerProps={{
					onClick: () => {
						share(BLUESKY);
					},
				}}
				placement="top"
			>
				Bluesky
			</Tooltip>
			<Tooltip
				trigger={(props) => (
					<IconButton {...props}>
						<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="fill-cn-10">
							<title>X</title>
							<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
						</svg>
					</IconButton>
				)}
				triggerProps={{
					onClick: () => {
						share(X);
					},
				}}
				placement="top"
			>
				X (Twitter)
			</Tooltip>
		</div>
	);
};
