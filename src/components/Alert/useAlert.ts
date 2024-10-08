import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { getColorTokens } from '~/modules/colors';

import {
  Icons,
  StyledProps,
  WithBorder,
  WithChildren,
  WithColors,
  WithDimension,
  WithFlexBox,
  WithMargin,
  WithPadding,
  WithRadius,
} from '~/types';

export interface AlertKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    WithColors,
    Omit<WithFlexBox, 'alignContent' | 'justifyItems'>,
    WithDimension,
    WithMargin,
    WithPadding,
    WithRadius {
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
  /**
   * Use a light background color.
   * @default false
   */
  light?: boolean;
  /** @default success */
  type: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export type AlertProps = Simplify<AlertKnownProps>;

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

export function getIconOptions(props: Pick<AlertProps, 'color' | 'light' | 'theme' | 'type'>) {
  const { color, light, theme, type } = props;
  const selectedColor = light
    ? getColor(type, false)
    : (color ?? getColorTokens(getColor(type, light), null, theme).textColor);

  const options = {
    success: {
      color: selectedColor,
      icon: 'check-circle',
    },
    warning: {
      color: selectedColor,
      icon: 'danger-circle',
    },
    error: {
      color: selectedColor,
      icon: 'close-circle',
    },
    info: {
      color: selectedColor,
      icon: 'info-circle',
    },
    neutral: {
      color: selectedColor,
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
  light: false,
  padding: 'md',
  radius: 'xs',
  type: 'success',
  width: '100%',
} satisfies Omit<AlertProps, 'children'>;

export function useAlert(props: AlertProps) {
  return useComponentProps(props, defaultProps);
}
