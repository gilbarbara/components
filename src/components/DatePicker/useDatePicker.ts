import { ReactNode } from 'react';
import { DayPickerBase, DayPickerRangeProps, DayPickerSingleProps } from 'react-day-picker';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  Color,
  PositionY,
  StyledProps,
  WithAccent,
  WithBorder,
  WithBorderless,
  WithDimension,
  WithDisabled,
  WithHeight,
  WithMargin,
  WithOpen,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export type DatePickerRangeClickHandler = (range: DatePickerRangeParameter) => void;

export type DatePickerRangeParameter = [from?: string, to?: string];

export type DatePickerRangeProps = Simplify<DatePickerRangeKnownProps>;

export type DatePickerSelectorProps = Simplify<
  DatePickerSelectorBaseProps &
    (
      | {
          mode: 'range';
          onChange?: DatePickerRangeClickHandler;
        }
      | {
          mode?: 'single';
          onChange?: DatePickerSingleClickHandler;
        }
    )
>;
export type DatePickerSingleClickHandler = (isoDate: string) => void;

export type DatePickerSingleProps = Simplify<DatePickerSingleKnownProps>;

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

export interface DatePickerSelectorBaseProps
  extends DatePickerBaseProps,
    Omit<DayPickerBase, 'disabled' | 'fromDate' | 'mode' | 'selected' | 'toDate'>,
    WithBorderless,
    Omit<WithDimension, 'height'>,
    WithDisabled,
    WithHeight,
    WithOpen,
    WithMargin {
  /**
   * The locale code (ISO 639-1 + optional country code) to use for formatting.
   * @default en-US
   */
  formatLocale?: string;
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
   * @default bottom-right
   */
  position?: PositionY | 'bottom-center' | 'top-center';
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

export const baseProps = {
  accent: 'primary',
  formatLocale: 'en-US',
  currentMonthLabel: 'Go to today',
} as const;

export const rangeDefaultProps = {
  ...baseProps,
  readOnly: false,
  showApply: false,
} satisfies DatePickerRangeProps;

export const selectorDefaultProps = {
  ...baseProps,
  borderless: false,
  disabled: false,
  height: 'md',
  mode: 'single',
  position: 'bottom-right',
  separator: ' — ',
  showRangeApply: false,
  width: 'auto',
} satisfies DatePickerSelectorProps;

export const singleDefaultProps = {
  ...baseProps,
  readOnly: false,
} satisfies DatePickerSingleProps;

export function useDatePicker<T extends DatePickerRangeProps | DatePickerSingleProps>(
  props: T,
  type?: 'range' | 'single',
) {
  return useComponentProps(props, type === 'single' ? singleDefaultProps : rangeDefaultProps);
}

export function useDatePickerSelector(props: DatePickerSelectorProps) {
  return useComponentProps(props, selectorDefaultProps);
}
