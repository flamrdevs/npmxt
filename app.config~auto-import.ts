import plugin from 'unplugin-auto-import/vite';

export default () =>
	plugin({
		imports: [
			{
				['clsx']: ['clsx'],

				['~/utils/delay']: ['delay'],
				['~/utils/range']: ['range'],
			},
		],
		include: [/\.tsx?$/],
		dts: './src/types/auto-imports.d.ts',
		biomelintrc: {
			enabled: true,
		},
	});
