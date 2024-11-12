import { createAsync } from '@solidjs/router';
import { Show } from 'solid-js';

import { usePackageContext } from '~/contexts/package-context';

import { queryPackageMetadata } from '~/npm/queries.client';

import { dayjs } from '~/utils/dayjs';

const format = (time: any) => {
	const timeDayjs = dayjs(time);
	if (timeDayjs.isValid()) return timeDayjs.fromNow();
};

export default () => {
	const pkg = usePackageContext();

	const pkgm = createAsync(() => queryPackageMetadata(pkg.name));

	return <Show when={pkgm()}>{(pkgm) => <Show when={format(pkgm().time[pkg.version])}>{(formatted) => <span class="text-xs lg:text-sm text-cn-9">{formatted()}</span>}</Show>}</Show>;
};
