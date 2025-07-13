import { createSignal, onMount } from 'solid-js';

import { Heart } from 'lucide';

import { usePackageContext } from '~/contexts/package-context';

import { LucideIcon } from '../icons';
import { IconButton, Tooltip } from '../ui';

export const NPMFavorite = () => {
	const pkg = usePackageContext();

	const key = () => `favorite-${pkg.name}`;

	const [is, setIs] = createSignal(false);

	onMount(() => {
		try {
			setIs(localStorage.getItem(key()) === 'true');
		} catch {}
	});

	return (
		<Tooltip
			trigger={(props) => (
				<IconButton {...props}>
					<LucideIcon i={Heart} class={is() ? 'fill-current' : ''} />
				</IconButton>
			)}
			triggerProps={{
				onClick: () => {
					setIs((v) => {
						const next = !v;
						try {
							localStorage.setItem(key(), `${next}`);
						} catch {}
						return next;
					});
				},
			}}
			placement="top"
		>
			{is() ? 'remove from favorite' : 'add to favorite'}
		</Tooltip>
	);
};
