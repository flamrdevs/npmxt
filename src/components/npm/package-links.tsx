import { Show } from 'solid-js';

import * as KLink from '@kobalte/core/link';
import GitUrlParse from 'git-url-parse';
import { Link2 } from 'lucide';

import { usePackageContext } from '~/contexts/package-context';
import { linkToNPMPackage } from '~/npm/href';
import type { TPackageSchema } from '~/npm/schema';

import { LucideIcon } from '../icons';
import * as SVGL from '../icons/svgl';
import { Tooltip } from '../ui';

const SUPPORTED_SOURCE = {
	gh: 'github',
	gl: 'gitlab',
} as const;

type KeyofSupportedSource = keyof typeof SUPPORTED_SOURCE;

export const getRepositoryInfo = ({ repository }: TPackageSchema) => {
	try {
		if (repository) {
			const url = typeof repository === 'string' ? repository : repository.url;
			if (url) {
				const parsed = GitUrlParse(url);
				for (const key in SUPPORTED_SOURCE) if (parsed.source.includes(SUPPORTED_SOURCE[key as KeyofSupportedSource])) return { src: key as KeyofSupportedSource, url: parsed.toString('https') };
			}
		}
	} catch {}
};

export const NPMPackageLinks = (props: Solid.JSX.HTMLAttributes<HTMLDivElement>) => {
	const pkg = usePackageContext();

	const sharedTriggerProps = {
		target: '_blank',
		rel: 'noreferrer',
		class: 'block p-1 size-7 hover:bg-cn-3',
	};

	return (
		<div {...props}>
			<Tooltip
				trigger={(triggerProps) => (
					<KLink.Root {...triggerProps} href={linkToNPMPackage(pkg.name, pkg.version)} {...sharedTriggerProps}>
						<SVGL.NPM class="size-full" />
					</KLink.Root>
				)}
				placement="top"
			>
				NPM
			</Tooltip>

			<Show when={getRepositoryInfo(pkg)} keyed>
				{(info) => (
					<Tooltip
						trigger={(triggerProps) => (
							<KLink.Root {...triggerProps} href={info.url} {...sharedTriggerProps}>
								{info.src === 'gh' ? <SVGL.GitHub class="size-full" /> : <SVGL.GitLab class="size-full" />}
							</KLink.Root>
						)}
						placement="top"
					>
						{info.src === 'gh' ? 'GitHub' : 'GitLab'}
					</Tooltip>
				)}
			</Show>

			<Show when={pkg.homepage}>
				{(homepage) => (
					<Tooltip
						trigger={(triggerProps) => (
							<KLink.Root {...triggerProps} href={homepage()} {...sharedTriggerProps}>
								<LucideIcon i={Link2} class="size-full" />
							</KLink.Root>
						)}
						placement="top"
					>
						Homepage
					</Tooltip>
				)}
			</Show>
		</div>
	);
};
