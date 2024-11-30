import { AriaAttributes } from 'react';
import { RequireAtLeastOne, Simplify, StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties } from 'csstype';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  ColorVariantTones,
  Position,
  StyledProps,
  TextSizes,
  WithAccent,
  WithComponentSize,
  WithHTMLAttributes,
  WithLabel,
  WithMargin,
} from '~/types';

export interface ProgressBarKnownProps
  extends StyledProps,
    AriaAttributes,
    WithAccent,
    WithComponentSize,
    WithHTMLAttributes,
    WithLabel,
    WithMargin {
  /**
   * Component track color
   * @default 'gray.200'
   */
  backgroundColor?: ColorVariantTones;
  /**
   * Whether the progress bar is busy.
   * @default false
   */
  busy?: boolean;
  /**
   * The locale to use for formatting the value.
   * @default 'en-US'
   */
  formatLocale?: string;
  /**
   * The options to use for formatting the value.
   * @default { style: 'percent' }
   */
  formatOptions?: Intl.NumberFormatOptions;
  headerJustify?: StandardLonghandProperties['justifyContent'];
  headerPosition?: Extract<Position, 'bottom' | 'top'>;
  /**
   * The largest value allowed for the value.
   * @default 100
   */
  maxValue?: number;
  /**
   * The smallest value allowed for the value.
   * @default 0
   */
  minValue?: number;
  /**
   * Whether to show the value label.
   * @default false
   */
  showValueLabel?: boolean;
  /**
   * Text size
   */
  textSize?: TextSizes;
  /**
   * A number between `minValue` and `maxValue`
   */
  value: number;
  /** @default 100% */
  width?: StringOrNumber;
}

export type ProgressBarProps = Simplify<RequireAtLeastOne<ProgressBarKnownProps, 'busy' | 'value'>>;

export const defaultProps = {
  accent: 'primary',
  formatLocale: 'en-US',
  formatOptions: { style: 'percent' },
  headerJustify: 'space-between',
  headerPosition: 'top',
  busy: false,
  maxValue: 100,
  minValue: 0,
  showValueLabel: false,
  size: 'md',
  width: '100%',
} satisfies Omit<ProgressBarProps, 'label' | 'value'>;

export function useProgressBar(props: ProgressBarProps) {
  return useComponentProps(props, defaultProps);
}
