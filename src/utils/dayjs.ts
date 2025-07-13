import dayjs from 'dayjs';
import plugin_customParseFormat from 'dayjs/plugin/customParseFormat';
import plugin_relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(plugin_customParseFormat);
dayjs.extend(plugin_relativeTime);

export { dayjs };
