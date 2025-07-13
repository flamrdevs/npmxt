import { createMemo, createUniqueId } from 'solid-js';
import { isServer } from 'solid-js/web';
import { Meta, Title, useHead } from '@solidjs/meta';
import { useLocation } from '@solidjs/router';

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

const usePropertyContentMeta = (property: string, content: string) => {
	useHead({
		tag: 'meta',
		props: { property, content },
		id: createUniqueId(),
		get name() {
			return property;
		},
	});
};

export const PreOGImage = (props: { img: string }) => {
	const image = createMemo(() => `${NPMXT}/og/${props.img}`);

	usePropertyContentMeta('og:image', image());
	usePropertyContentMeta('twitter:image', image());

	return null;
};

export const OG = (() => {
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

		usePropertyContentMeta('og:type', 'website');
		usePropertyContentMeta('og:url', url());
		usePropertyContentMeta('og:title', title());
		usePropertyContentMeta('og:description', description());
		usePropertyContentMeta('og:image', image());

		usePropertyContentMeta('og:image:type', 'image/png');
		usePropertyContentMeta('og:image:width', `${og_width}`);
		usePropertyContentMeta('og:image:height', `${og_height}`);

		usePropertyContentMeta('twitter:card', 'summary_large_image');
		usePropertyContentMeta('twitter:url', url());
		usePropertyContentMeta('twitter:title', title());
		usePropertyContentMeta('twitter:description', description());
		usePropertyContentMeta('twitter:image', image());

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
