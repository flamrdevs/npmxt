import { onCleanup, onMount } from 'solid-js';

export default () => {
	onMount(() => {
		const interval = setInterval(() => {
			console.log('packages');
		}, 5000);

		onCleanup(() => {
			clearInterval(interval);
		});
	});

	return <div class="flex items-center justify-center h-40">packages</div>;
};
