import { ReactNode } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  ColorTone,
  ColorVariant,
  Position,
  Spacing,
  StyledProps,
  WithHTMLAttributes,
  WithMargin,
} from '~/types';

export interface StatusIndicatorKnownProps extends StyledProps, WithHTMLAttributes, WithMargin {
  /**
   * The size of the inner circle relative to the outer circle.
   * @default 0.7
   */
  borderRatio?: number;
  /** Component color */
  color?: ColorVariant | string;
  /**
   * The gap between the component and the label.
   * @default xxs
   */
  gap?: Spacing;
  /**
   * The icon to display inside the component.
   */
  icon?: ReactNode;
  label?: ReactNode;
  /**
   * The position of the label.
   * @default 'bottom'
   */
  labelPosition?: Position;
  /**
   * The size of the component.
   * @default 24
   */
  size?: number;
  /**
   * The inner circle color tone.
   * @default 100
   */
  tone?: ColorTone;
}

export type StatusIndicatorProps = Simplify<StatusIndicatorKnownProps>;

export const defaultProps = {
  borderRatio: 0.7,
  color: 'green',
  gap: 'xxs',
  labelPosition: 'bottom',
  tone: '100',
  size: 24,
} satisfies StatusIndicatorProps;

export function useStatusIndicator(props: StatusIndicatorProps) {
  return useComponentProps(props, defaultProps);
}
