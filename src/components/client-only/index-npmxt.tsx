import { For } from 'solid-js';

import { Motion } from 'solid-motionone';

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
						{ v: 'n', x: -50 },
						{ v: 'p', x: -20 },
						{ v: 'm', x: 0 },
						{ v: 'x', x: 20 },
						{ v: 't', x: 50 },
					]}
				>
					{({ v, x }) => (
						<Motion.span class="inline-block" initial={{ x, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 2, easing: [0.16, 1, 0.3, 1] }}>
							{v}
						</Motion.span>
					)}
				</For>
			</div>
		</div>
	);
};
