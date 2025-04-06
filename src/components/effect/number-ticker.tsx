import { onMount, splitProps } from 'solid-js';

import { animate, onScroll } from 'animejs';

export namespace NumberTicker {
	export type Props = Solid.JSX.HTMLAttributes<HTMLSpanElement> & {
		value: number;
		format?: (value: number) => string;
	};
}

const defaultFormat = ((value) => `${value}`) satisfies NumberTicker.Props['format'];

const localSplitter = ['value', 'format'] as const satisfies (keyof NumberTicker.Props)[];

export const NumberTicker = (props: NumberTicker.Props) => {
	const [local, others] = splitProps(props, localSplitter);

	const format = local.format || defaultFormat;

	let ref!: HTMLSpanElement;

	onMount(() => {
		const state = {
			value: 0,
		};

		animate(state, {
			value: local.value,
			duration: 700,
			playbackEase: 'outCirc',
			onRender: () => {
				ref.textContent = format(state.value);
			},
			autoplay: onScroll({
				debug: __DEV__,
				repeat: false,
			}),
		});
	});

	return (
		<span {...others} ref={ref}>
			{format(0)}
		</span>
	);
};
