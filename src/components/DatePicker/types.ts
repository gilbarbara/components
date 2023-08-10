import { ReactNode } from 'react';
import { DayPickerRangeProps, DayPickerSingleProps } from 'react-day-picker';
import { StringOrNumber } from '@gilbarbara/types';

import {
  Alignment,
  ColorVariants,
  StyledProps,
  WithBorder,
  WithBorderless,
  WithMargin,
  WithOpen,
  WithPadding,
  WithRadius,
  WithShadow,
} from '../../types';

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

export interface DatePickerSingleProps
  extends DatePickerProps<DatePickerSingleClickHandler, 'single'>,
    DatePickerLayoutProps {}

export interface DatePickerRangerProps
  extends DatePickerProps<DatePickerRangeClickHandler, 'range'>,
    DatePickerLayoutProps {
  /**
   * @default en-US
   */
  formatLocale?: string;
  /**
   * For internal use with DatePickerInput
   * @private
   * */
  onApply?: (selected: DatePickerRangeParameter) => void;
  /**
   * For internal use with DatePickerInput
   * @private
   * */
  showApply?: boolean;
}

export interface DatePickerInputProps
  extends WithBorderless,
    WithOpen,
    DatePickerBaseProps<DatePickerClickHandler> {
  /**  @default en-US */
  formatLocale?: string;
  large?: boolean;
  placeholder?: string;
  /** @default right */
  position?: Alignment;
  separator?: string;
  showRange?: boolean;
  showRangeApply?: boolean;
  width?: StringOrNumber;
}
