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
			animate(0, local.value, {
				duration: 0.7,
				ease: [0.075, 0.82, 0.165, 1] /* Out Circ */,
				onUpdate: (latest) => {
					ref.textContent = format(latest);
				},
			});
		});
	});

	return (
		<span {...others} ref={ref}>
			{format(0)}
		</span>
	);
};
