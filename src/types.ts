import { Options, StyleAttr } from '@antv/g2plot';

export type Datum = {
  date: string;
  value: number | null;
};

export type CalendarDatum = {
  x: string;
  year: string;
  month: string;
  week: string;
  day: string;
  date: string;
  value: number | null;
};

export interface CalendarOptions
  extends Omit<Options, 'data' | 'xAxis' | 'yAxis' | 'axis' | 'legend'  | 'label'> {
  /** 数据 */
  readonly data: Datum[];
  /** 热力图形样式 */
  readonly style?: StyleAttr;
}
