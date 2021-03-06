import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { CalendarDatum, Datum } from './types';

dayjs.extend(weekOfYear);

function mapDayToMonth(month: number) {
  const dayOfMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return dayOfMonth[month];
}

export const DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

function mapDayToWeek(day: number) {
  return DAY_OF_WEEK[day];
}

export function getCalendarData(values: Datum[], lastDay?: string, dateFormat = 'YYYY-MM-DD') {
  const endDate = dayjs(lastDay);
  const startDate = endDate.subtract(1, 'year');

  const result: (Omit<CalendarDatum, 'date' | 'day'> & { date: dayjs.Dayjs; day: number })[] = [];
  for (let date = startDate; !date.isAfter(endDate); ) {
    result.push({
      x: `${date.week() === 1 && date.month() === 11 ? date.year() + 1 : date.year()}-${date.week()}`,
      year: `${date.year()}`,
      value: values.find((v) => v.date === date.format(dateFormat))?.value || 0,
      month: mapDayToMonth(date.month()),
      week: `${date.week()}`,
      date: date,
      day: date.day(),
    });
    date = date.add(1, 'day');
  }

  return result.map((d) => ({ ...d, date: d.date.format(dateFormat), day: mapDayToWeek(d.day) }));
}

/**
 * 根据 第 N 周获取月份（只获取第一个周的月份）
 * @param week
 * @returns
 */
export function getFirstDateOfMonthByWeek(week: number): string {
  const date = dayjs().week(week);
  return date.date() > 7 ? '' : mapDayToMonth(date.month());
}
