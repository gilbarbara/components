import { ReactNode } from 'react';
import { DayPickerRangeProps, DayPickerSingleProps } from 'react-day-picker';

import {
  ColorVariants,
  StyledProps,
  WithBorder,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '../types';

export type DatePickerRangeParameter = [string | undefined, string | undefined];

export type DatePickerClickHandler = (isoString: string | DatePickerRangeParameter) => void;
export type DatePickerRangeClickHandler = (isoStrings: DatePickerRangeParameter) => void;
export type DatePickerSingleClickHandler = (isoString: string) => void;

export type DatePickerOmitProps =
  | 'fromDate'
  | 'mode'
  | 'modifiers'
  | 'month'
  | 'onMonthChange'
  | 'onSelect'
  | 'selected'
  | 'toDate';

export interface DatePickerBaseProps<
  T extends DatePickerSingleClickHandler | DatePickerRangeClickHandler,
> extends StyledProps {
  /**
   * @default Go to today
   */
  currentMonthLabel?: ReactNode;
  fromDate?: string | Date;
  onSelect?: T;
  toDate?: string | Date;
  /** @default primary */
  variant?: ColorVariants;
}

export interface DatePickerLayoutProps
  extends WithBorder,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {}

export type DatePickerProps<
  T extends DatePickerSingleClickHandler | DatePickerRangeClickHandler,
  M extends 'single' | 'range',
> = DatePickerBaseProps<T> &
  Omit<M extends 'single' ? DayPickerSingleProps : DayPickerRangeProps, DatePickerOmitProps>;
