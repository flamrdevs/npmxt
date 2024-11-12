import { createAsync, query, redirect } from '@solidjs/router';

import { Construction, LogOut } from 'lucide';

import { LucideIcon } from '~/components/icons';
import * as Meta from '~/components/meta';
import { Button } from '~/components/ui';

import { logoutAction } from '~/auth/actions';
import { getSessionData } from '~/auth/session';

const preload = query(async () => {
	'use server';

	if (__DEV__) console.log('DashPage - preload');
	try {
		const sessionData = await getSessionData();
		if (sessionData) return sessionData;
	} catch (error) {
		if (__DEV__) console.error(error);
	}

	throw redirect('/login');
}, 'page:dash');

export default function DashPage() {
	createAsync(() => preload());

	return (
		<>
			<Meta.Base title="Dash" description="Dash npmxt" />

			<div class="flex items-center justify-center sm:pt-4 md:pt-10 xl:pt-24 sm:pb-3 md:pb-8 xl:pb-16">
				<div class="relative flex flex-col mx-0 sm:mx-5 md:mx-10 px-5 py-4 md:px-8 md:py-6 2xl:px-10 2xl:py-8 w-full max-w-[60rem] min-h-dvh sm:min-h-fit bg-cn-2 border border-transparent md:border-cn-6 rounded-none sm:rounded-3xl shadow">
					<div class="flex justify-between">
						<div class="flex items-center gap-2 md:gap-3 text-lg md:text-xl">
							<LucideIcon i={Construction} class="ml-2 size-5" />
							<span>Under Development</span>
						</div>

						<form action={logoutAction} method="post">
							<Button type="submit">
								<span>Log out</span>
								<LucideIcon i={LogOut} class="ml-2 size-5" />
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
