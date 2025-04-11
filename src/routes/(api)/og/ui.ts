import { defaultStatic } from '~/server/imgx/route/default-static';

export const GET = defaultStatic(() => import('~/components/npm/imgx/og/ui'));
