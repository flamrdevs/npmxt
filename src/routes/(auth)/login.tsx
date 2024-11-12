import { createAsync, query, redirect, useSubmission } from '@solidjs/router';
import { Show } from 'solid-js';

import { AlertCircle, LogIn } from 'lucide';

import { RenderStatusMessageError } from '~/components/error';
import { LucideIcon } from '~/components/icons';
import * as Meta from '~/components/meta';
import { Button, TextField } from '~/components/ui';

import { loginAction } from '~/auth/actions';
import { getSessionData } from '~/auth/session';

const guard = query(async () => {
	'use server';

	if (__DEV__) console.log('LoginPage - guard');
	try {
		const sessionData = await getSessionData();
		if (!sessionData) return null;
	} catch (error) {
		if (__DEV__) console.error(error);
	}

	throw redirect('/dash');
}, 'page:login');

export default function LoginPage() {
	createAsync(() => guard());

	const submission = useSubmission(loginAction);

	return (
		<>
			<Meta.Base title="Login" description="Login npmxt" />

			<div class="flex items-center justify-center w-dvw h-dvh bg-cn-1 text-cn-12">
				<form action={loginAction} method="post">
					<div class="flex flex-col items-scratch justify-center gap-4 bg-cn-2 px-6 lg:px-8 py-7 lg:py-10 border border-cn-6 rounded-3xl w-full">
						<div class="space-y-2">
							<h2 class="font-bold text-4xl text-center text-cn-12">Login</h2>
							<p class="font-medium text-xl text-center text-cn-11">dash</p>
						</div>

						<TextField name="username" type="text" label="Username" class="w-full" />
						<TextField name="password" type="password" label="Password" class="w-full" />
						<Button type="submit" class="mt-1 lg:mt-4">
							<span>Login</span>
							<LucideIcon i={LogIn} class="ml-2 size-5" />
						</Button>

						<Show when={submission.error}>
							{(error) => (
								<RenderStatusMessageError
									error={error()}
									render={(message) => (
										<div class="relative flex gap-2 md:gap-4 mt-1 md:mt-2 px-2 py-1 md:px-3 md:py-1.5 bg-ce-2 border border-ce-5 rounded-md shadow">
											<div class="p-1">
												<LucideIcon i={AlertCircle} class="text-ce-9" />
											</div>
											<div class="font-medium text-base lg:text-lg">{message}</div>
										</div>
									)}
								/>
							)}
						</Show>
					</div>
				</form>
			</div>
		</>
	);
}
