import { AriaAttributes } from 'react';
import { RequireAtLeastOne, Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  ColorVariantTones,
  Position,
  Sizes,
  Spacing,
  StyledProps,
  TextSizes,
  WithAccent,
  WithComponentSize,
  WithHTMLAttributes,
  WithLabel,
  WithMargin,
} from '~/types';

export type ProgressCircleProps = Simplify<
  RequireAtLeastOne<ProgressCircleKnownProps, 'busy' | 'value'>
>;

export interface ProgressCircleKnownProps
  extends StyledProps,
    AriaAttributes,
    WithAccent,
    WithComponentSize<Sizes | number>,
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
  /**
   * The gap between the progress circle and the label.
   * @default xs
   */
  gap?: Spacing;
  labelPosition?: Position;
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
   *	Whether to show the value label.
   * @default false
   */
  showValueLabel?: boolean;
  /**
   * The width of the stroke.
   * @default 3
   */
  strokeWidth?: number;
  /**
   * Text size
   */
  textSize?: TextSizes | number;
  /**
   * A number between `minValue` and `maxValue`
   */
  value: number;
}

export const defaultProps = {
  accent: 'primary',
  busy: false,
  formatLocale: 'en-US',
  formatOptions: { style: 'percent' },
  gap: 'xs',
  labelPosition: 'top',
  maxValue: 100,
  minValue: 0,
  showValueLabel: false,
  size: 'md',
  strokeWidth: 3,
} satisfies Omit<ProgressCircleProps, 'label' | 'value'>;

export function useProgressCircle(props: ProgressCircleProps) {
  return useComponentProps(props, defaultProps);
}
