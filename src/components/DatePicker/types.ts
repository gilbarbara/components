import { ReactNode } from 'react';
import { DayPickerBase, DayPickerRangeProps, DayPickerSingleProps } from 'react-day-picker';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import {
  Alignment,
  Color,
  StyledProps,
  WithAccent,
  WithBorder,
  WithBorderless,
  WithDisabled,
  WithMargin,
  WithOpen,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export type DatePickerRangeParameter = [from?: string, to?: string];

export type DatePickerRangeClickHandler = (range: DatePickerRangeParameter) => void;
export type DatePickerSingleClickHandler = (isoDate: string) => void;

export interface DatePickerBaseProps extends StyledProps, WithAccent<Color> {
  /**
   * @default Go to today
   */
  currentMonthLabel?: ReactNode;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export interface DatePickerLayoutProps
  extends WithBorder,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {}

export interface DatePickerRangeKnownProps
  extends DatePickerBaseProps,
    DatePickerLayoutProps,
    Omit<DayPickerRangeProps, 'fromDate' | 'mode' | 'selected' | 'onSelect' | 'toDate'> {
  /**
   * The date format to use when displaying the dates.
   * @default en-US
   */
  formatLocale?: string;
  /**
   * For internal use with DatePickerInput
   * @private
   */
  onApply?: (selected: DatePickerRangeParameter) => void;
  onChange?: DatePickerRangeClickHandler;
  readOnly?: boolean;
  /**
   * The initial date.
   */
  selected?: DatePickerRangeParameter;
  /**
   * For internal use with DatePickerInput
   * @private
   */
  showApply?: boolean;
}

export type DatePickerRangeProps = Simplify<DatePickerRangeKnownProps>;

export interface DatePickerSingleKnownProps
  extends DatePickerBaseProps,
    DatePickerLayoutProps,
    Omit<DayPickerSingleProps, 'fromDate' | 'mode' | 'onSelect' | 'selected' | 'toDate'> {
  onChange?: DatePickerSingleClickHandler;
  readOnly?: boolean;
  /**
   * The initial date.
   */
  selected?: string;
}

export type DatePickerSingleProps = Simplify<DatePickerSingleKnownProps>;

export interface DatePickerSelectorBaseProps
  extends DatePickerBaseProps,
    Omit<DayPickerBase, 'disabled' | 'fromDate' | 'mode' | 'selected' | 'toDate'>,
    WithBorderless,
    WithDisabled,
    WithOpen,
    WithMargin {
  /**
   * The date format to use when displaying the dates.
   * @default en-US
   */
  formatLocale?: string;
  large?: boolean;
  /**
   * Whether to show the calendar in range or single mode.
   * @default single
   */
  mode?: 'range' | 'single';
  /**
   * Add a hidden input with the given name.
   */
  name?: string;
  /**
   * For internal use with DatePickerSelector
   * @private
   */
  onApply?: (selected: DatePickerRangeParameter) => void;
  placeholder?: string;
  /**
   * The position of the calendar relative to the input.
   * @default right
   */
  position?: Alignment;
  /**
   * The initial date.
   */
  selected?: DatePickerRangeParameter | string;
  /**
   * The separator for date ranges.
   * @default ' — '
   */
  separator?: string;
  /**
   * Show a button to apply the selected range.
   * @default false
   */
  showRangeApply?: boolean;
  /**
   * The width of the selector.
   * It has a min-width of 200px.
   */
  width?: StringOrNumber;
}

export type DatePickerSelectorProps = Simplify<
  DatePickerSelectorBaseProps &
    (
      | {
          mode: 'range';
          onChange?: DatePickerRangeClickHandler;
        }
      | {
          mode: 'single';
          onChange?: DatePickerSingleClickHandler;
        }
    )
>;
