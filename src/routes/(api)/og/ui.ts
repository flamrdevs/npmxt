import { defaultStatic } from '~/server/imgx/route';

export const GET = defaultStatic(() => import('~/components/npm/imgx/og/ui'));
