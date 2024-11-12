import { Meta, Title, useHead } from '@solidjs/meta';
import { useLocation } from '@solidjs/router';
import { createMemo, createUniqueId } from 'solid-js';
import { isServer } from 'solid-js/web';

import { height as og_height, width as og_width } from '~/server/imgx/response/og/config';

import { NPMXT } from '~/utils/url';

const TITLE = 'npmxt';
const DESCRIPTION = 'npm e-xtended tools | Supercharge your development with npm e-xtended tools - essential utilities to boost productivity.';

export namespace Base {
	export type Props = { title?: string; description?: string };
}

export const Base = (props: Base.Props) => {
	const title = createMemo(() => `${props.title || TITLE}`);
	const description = createMemo(() => `${props.description || DESCRIPTION}`);

	return (
		<>
			<Title>{title()}</Title>
			<Meta name="description" content={description()} />
		</>
	);
};

export namespace OG {
	export type Props = {
		title?: string;
		description?: string;
		img?: string;
	};
}

export const OG = (() => {
	const use = (property: string, content: string) => {
		useHead({
			tag: 'meta',
			props: { property, content },
			id: createUniqueId(),
			get name() {
				return property;
			},
		});
	};

	return (props: OG.Props) => {
		const location = useLocation();

		const title = createMemo(() => `${props.title || TITLE}`);
		const description = createMemo(() => `${props.description || DESCRIPTION}`);
		const url = createMemo(() => `${NPMXT}${location.pathname}`);
		const image = createMemo(() => `${NPMXT}/og/${props.img || 'main'}`);

		if (__DEV__) {
			if (!isServer) {
				console.log('Meta.OG', {
					url: url(),
					image: image(),
				});
			}
		}

		use('og:type', 'website');
		use('og:url', url());
		use('og:title', title());
		use('og:description', description());
		use('og:image', image());

		use('og:image:type', 'image/png');
		use('og:image:width', `${og_width}`);
		use('og:image:height', `${og_height}`);

		use('twitter:card', 'summary_large_image');
		use('twitter:url', url());
		use('twitter:title', title());
		use('twitter:description', description());
		use('twitter:image', image());

		return null;
	};
})();

export const Page = (props: Base.Props & OG.Props) => {
	return (
		<>
			<Base title={props.title} description={props.description} />
			<OG title={props.title} description={props.description} img={props.img} />
		</>
	);
};
