import { For, onMount, type ParentProps } from 'solid-js';

import { animate } from 'animejs';

const MotionSpan = (props: ParentProps<{ x: number }>) => {
	let ref!: HTMLSpanElement;

	onMount(() => {
		animate(ref, { x: { from: `${props.x}px`, to: '0px' }, opacity: { from: 0, to: 1 }, duration: 1000 });
	});

	return (
		<span
			class="inline-block"
			ref={ref}
			style={{
				opacity: 0,
				transform: `translate(${props.x}px, 0)`,
			}}
		>
			{props.children}
		</span>
	);
};

export default () => {
	return (
		<div class="absolute inset-x-0 top-36 md:top-24 xl:top-12 -z-20 transform-gpu flex items-center justify-center overflow-hidden">
			<div
				class="font-bold text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[20rem] xl:text-[26rem] 2xl:text-[32rem] text-cn-1"
				style={{
					'text-shadow': '0px 0px 2px hsl(var(--c-n-6))',
				}}
			>
				<For
					each={[
						{ c: 'n', x: -70 },
						{ c: 'p', x: -30 },
						{ c: 'm', x: 0 },
						{ c: 'x', x: 30 },
						{ c: 't', x: 70 },
					]}
				>
					{({ c, x }) => <MotionSpan x={x}>{c}</MotionSpan>}
				</For>
			</div>
		</div>
	);
};
