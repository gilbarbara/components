import { forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  baseStyles,
  borderStyles,
  dimensionStyles,
  flexBoxStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  radiusStyles,
} from '~/modules/system';

import { Icon } from '~/components/Icon';
import { Text } from '~/components/Text';

import {
  Icons,
  StyledProps,
  WithBorder,
  WithChildren,
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

function getColor(type: AlertProps['type'], light?: boolean) {
  const colors = {
    success: light ? 'green.100' : 'green.600',
    warning: light ? 'orange.100' : 'orange.600',
    error: light ? 'red.100' : 'red.600',
    info: light ? 'blue.100' : 'blue.600',
    neutral: light ? 'gray.100' : 'gray.600',
  } as const;

  return colors[type];
}

function getIconOptions(props: AlertProps) {
  const { light, type } = props;
  const color = light
    ? getColor(type, false)
    : getColorTokens(getColor(type, light), null, getTheme(props)).textColor;

  const options = {
    success: {
      color,
      icon: 'check-circle',
    },
    warning: {
      color,
      icon: 'danger-circle',
    },
    error: {
      color,
      icon: 'close-circle',
    },
    info: {
      color,
      icon: 'info-circle',
    },
    neutral: {
      color,
      icon: 'message-circle',
    },
  } as const;

  return options[type];
}

export const defaultProps = {
  align: 'center',
  direction: 'row',
  gap: 12,
  hideIcon: false,
  iconSize: 20,
  light: false,
  padding: 'md',
  radius: 'xs',
  type: 'success',
  width: '100%',
} satisfies Omit<AlertProps, 'children'>;

export const StyledAlert = styled(
  'div',
  getStyledOptions('type'),
)<AlertProps>(props => {
  const { align, direction, light, type } = props;
  const { grayScale, spacing, white, ...theme } = getTheme(props);
  const { mainColor, textColor } = getColorTokens(getColor(type, light), null, theme);

  return css`
    ${baseStyles(props)};
    align-items: ${align};
    background-color: ${mainColor};
    color: ${textColor};
    display: flex;
    flex-direction: ${direction};
    position: relative;
    width: 100%;
    ${borderStyles(props)};
    ${dimensionStyles(props)};
    ${flexBoxStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
  `;
});

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { children, direction, hideIcon, icon, iconSize, light, type, ...rest } = mergeProps(
    defaultProps,
    props,
  );
  const selected = getIconOptions(mergeProps(defaultProps, props));

  return (
    <StyledAlert
      ref={ref}
      data-component-name="Alert"
      direction={direction}
      light={light}
      role="alert"
      type={type}
      {...rest}
    >
      {!hideIcon && <Icon color={selected.color} name={icon ?? selected.icon} size={iconSize} />}
      {isValidElement(children) ? children : <Text>{children}</Text>}
    </StyledAlert>
  );
});

Alert.displayName = 'Alert';
