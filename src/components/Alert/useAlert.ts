import { SetRequired, Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { getColorTokens } from '~/modules/colors';

import {
  Icons,
  StyledProps,
  Variant,
  WithBorder,
  WithChildren,
  WithColors,
  WithDimension,
  WithFlexBox,
  WithMargin,
  WithPadding,
  WithRadius,
  WithVariant,
} from '~/types';

export type AlertProps = Simplify<AlertKnownProps>;

export interface AlertKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    WithColors,
    Omit<WithFlexBox, 'alignContent' | 'justifyItems'>,
    WithDimension,
    WithMargin,
    WithPadding,
    WithRadius,
    WithVariant<Exclude<Variant, 'clean' | 'shadow'> | 'light'> {
  hideIcon?: boolean;
  /**
   * Custom icon.
   */
  icon?: Icons;
  /**
   * Icon size.
   * @default 20
   */
  iconSize?: number;
  /** @default success */
  type: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export function getColor(type: AlertProps['type'], light?: boolean) {
  const colors = {
    success: light ? 'green.100' : 'green.600',
    warning: light ? 'orange.100' : 'orange.600',
    error: light ? 'red.100' : 'red.600',
    info: light ? 'blue.100' : 'blue.600',
    neutral: light ? 'gray.100' : 'gray.600',
  } as const;

  return colors[type];
}

export function getIconOptions(
  props: Pick<
    SetRequired<AlertProps, 'theme' | 'variant'>,
    'bg' | 'color' | 'theme' | 'type' | 'variant'
  >,
) {
  const { bg, color, theme, type, variant } = props;
  const notSolid = ['bordered', 'light'].includes(variant);

  let iconColor = getColorTokens(getColor(type), null, theme)[notSolid ? 'mainColor' : 'textColor'];

  if (bg) {
    iconColor = getColorTokens(bg, null, theme)[variant === 'bordered' ? 'mainColor' : 'textColor'];
  }

  if (color) {
    iconColor = getColorTokens(color, null, theme).mainColor;
  }

  const options = {
    success: {
      color: iconColor,
      icon: 'check-circle',
    },
    warning: {
      color: iconColor,
      icon: 'danger-circle',
    },
    error: {
      color: iconColor,
      icon: 'close-circle',
    },
    info: {
      color: iconColor,
      icon: 'info-circle',
    },
    neutral: {
      color: iconColor,
      icon: 'flash-o',
    },
  } as const;

  return options[type];
}

export const defaultProps = {
  align: 'center',
  direction: 'row',
  gap: 'sm',
  hideIcon: false,
  iconSize: 20,
  padding: 'md',
  radius: 'xs',
  type: 'success',
  variant: 'solid',
  width: '100%',
} satisfies Omit<AlertProps, 'children'>;

export function useAlert(props: AlertProps) {
  return useComponentProps(props, defaultProps);
}
