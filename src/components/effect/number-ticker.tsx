import { animate, inView } from 'motion';
import { onMount, splitProps } from 'solid-js';

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
		inView(ref, () => {
			animate(
				(progress) => {
					ref.textContent = format(progress * local.value);
				},
				{
					duration: 0.7,
					easing: [0.16, 1, 0.3, 1] /* easeOutExpo */,
				}
			);
		});
	});

	return (
		<span {...others} ref={ref}>
			{format(0)}
		</span>
	);
};
