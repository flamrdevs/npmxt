import { locale } from './locale';

export const formatNumber = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format;
export const formatNumberCompact = new Intl.NumberFormat(locale, { maximumFractionDigits: 0, notation: 'compact' }).format;
