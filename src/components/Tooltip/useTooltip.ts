import { CSSProperties, ReactNode } from 'react';
import { omit } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { textDefaultOptions } from '~/modules/options';

import {
  Placement,
  Sizes,
  WithChildren,
  WithColors,
  WithDisabled,
  WithOpen,
  WithPadding,
  WithRadius,
  WithShadow,
  WithTextOptions,
} from '~/types';

export type TooltipProps = Simplify<TooltipKnownProps>;

export interface TooltipAnimationProps {
  /**
   * The delay before the tooltip is shown in milliseconds.
   * @default 180
   */
  delay: number;
  /**
   * The duration of the animation in milliseconds.
   * @default 260
   */
  duration: number;
  /**
   * The easing function.
   * @default ease-in-out
   */
  easing: string;
}

export interface TooltipArrowProps {
  /**
   * The distance between the arrow and the target.
   * @default 4
   */
  arrowDistance: number;
  /** @default 8 */
  arrowLength: number;
  /**
   * The margin for the arrow with start/end alignment.
   * @default 4 */
  arrowMargin: number;
}

export interface TooltipColorProps {
  bg: string;
  color: string;
}

export interface TooltipKnownProps
  extends Partial<TooltipSharedProps>,
    Partial<TooltipAnimationProps>,
    Partial<TooltipArrowProps>,
    WithChildren,
    WithColors,
    WithDisabled,
    WithOpen,
    WithPadding,
    WithRadius,
    WithShadow,
    WithTextOptions {
  /**
   * Optional aria label for the tooltip.
   * @default innerText of the content
   */
  ariaLabel?: string;
  content: ReactNode;
  /**
   * Trigger type.
   * @default hover
   */
  eventType?: 'click' | 'hover';
  style?: CSSProperties;
}

export interface TooltipSharedProps {
  /**
   * The placement of the tooltip.
   * @default bottom-middle
   */
  placement: Placement;
  /**
   * Optional title for the tooltip.
   */
  title?: string;
  /** Content wrapping */
  wrap?: Sizes;
  /** @default 100 */
  zIndex?: number;
}

export const defaultProps = {
  ...omit(textDefaultOptions, 'size'),
  arrowDistance: 4,
  arrowMargin: 4,
  arrowLength: 8,
  bg: 'gray.700',
  delay: 180,
  disabled: false,
  duration: 260,
  easing: 'ease-in-out',
  eventType: 'hover',
  placement: 'bottom-middle',
  radius: 'xxs',
  size: 'sm',
  zIndex: 100,
} satisfies Omit<TooltipProps, 'children' | 'content'>;

export function useTooltip(props: TooltipProps) {
  return useComponentProps(props, defaultProps);
}
