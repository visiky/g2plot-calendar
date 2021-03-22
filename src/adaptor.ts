import { Params } from '@antv/g2plot';
import { getCalendarData, getFirstDateOfMonthByWeek } from './utils';
import { CalendarOptions } from './types';

export const defaultOptions = {
  tooltip: {
    shared: true,
    showMarkers: false,
    fields: ['value', 'date'],
    showTitle: true,
    title: (title, { date }) => date,
    domStyles: {
      'g2-tooltip': {
        margin: 0,
        padding: '2px 4px',
        fontSize: '10px',
      },
      'g2-tooltip-list-item': {
        margin: '6px 0',
      },
      'g2-tooltip-title': {
        margin: '4px 0 0',
      },
    },
  },
  style: () => {
    return {
      radius: 4,
      stroke: '#fff',
      lineWidth: 4,
    };
  },
};

/**
 * 默认色彩
 */
export const DEFAULT_COLORS = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

export function adaptor(params: Params<CalendarOptions>): Params<CalendarOptions> {
  const { chart, options } = params;

  const { data, color, tooltip, style } = options;

  const calendarData = getCalendarData(data);

  chart.data(calendarData);

  const geometry = chart.polygon().position('x*day');

  geometry.color('value', color || DEFAULT_COLORS);

  if (typeof style === 'function') {
    geometry.style('value*month*week*day', (value, month, week, day) => style({ value, month, week, day }));
  } else if (style) {
    geometry.style(style)
  }

  geometry.shape('', () => ['square', 1, 1]);

  chart.coordinate().reflect('y');

  chart.legend(false);
  chart.tooltip(tooltip);
  chart.axis('x', {
    line: null,
    grid: null,
    tickLine: null,
    subTickLine: null,
    label: {
      autoHide: false,
      formatter: (text, item) => {
        return getFirstDateOfMonthByWeek(Number(text.slice(5)));
      },
    },
  });
  chart.axis('day', { line: null, grid: null });

  return params;
}
