import { klassed } from '@klass/solid/mono';

import { klassXVariants } from '../../utils';

import './loader.css';

export const Loader = klassed('div', {
	base: 'xt-loader',
	variants: klassXVariants({
		color: ['n', 'p'],
		size: ['sm', 'md', 'lg'],
	}),
	defaults: {
		color: 'n',
		size: 'md',
	},
});
