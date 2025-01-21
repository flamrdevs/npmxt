import { Show } from 'solid-js';

import { Root as Link } from '@kobalte/core/link';

import { Link2 } from 'lucide';

import GitUrlParse from 'git-url-parse';

import { linkToNPMPackage } from '~/npm/href';
import type { TPackageSchema } from '~/npm/schema';

import { usePackageContext } from '~/contexts/package-context';

import { LucideIcon } from '../icons';
import * as SVGL from '../icons/svgl';
import { Tooltip } from '../ui';

const SUPPORTED_SOURCE = {
	gh: 'github',
	gl: 'gitlab',
} as const;

type KeyofSupportedSource = keyof typeof SUPPORTED_SOURCE;

export const getRepositoryInfo = (pkg: TPackageSchema) => {
	try {
		if (pkg.repository) {
			const parsed = GitUrlParse(pkg.repository.url);
			for (const key in SUPPORTED_SOURCE) if (parsed.source.includes(SUPPORTED_SOURCE[key as KeyofSupportedSource])) return { src: key as KeyofSupportedSource, url: parsed.toString('https') };
		}
	} catch (error) {}
};

export const NPMPackageLinks = (props: Solid.JSX.HTMLAttributes<HTMLDivElement>) => {
	const pkg = usePackageContext();

	return (
		<div {...props}>
			<Tooltip
				trigger={(triggerProps) => (
					<Link {...triggerProps} href={linkToNPMPackage(pkg.name, pkg.version)} target="_blank" rel="noreferrer" class="block p-1 size-7 hover:bg-cn-3">
						<SVGL.NPM class="size-full" />
					</Link>
				)}
				placement="top"
			>
				NPM
			</Tooltip>

			<Show when={getRepositoryInfo(pkg)} keyed>
				{(info) => (
					<Tooltip
						trigger={(triggerProps) => (
							<Link {...triggerProps} href={info.url} target="_blank" rel="noreferrer" class="block p-1 size-7 hover:bg-cn-3">
								{info.src === 'gh' ? <SVGL.GitHub class="size-full" /> : <SVGL.GitLab class="size-full" />}
							</Link>
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
							<Link {...triggerProps} href={homepage()} target="_blank" rel="noreferrer" class="block p-1 size-7 hover:bg-cn-3">
								<LucideIcon i={Link2} class="size-full" />
							</Link>
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
