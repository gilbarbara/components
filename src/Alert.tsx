import * as React from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import { getTheme } from './modules/helpers';
import { baseStyles, isDarkMode, marginStyles, styledOptions } from './modules/system';
import { Text } from './Text';
import { ComponentProps, Icons, StyledProps, Theme, WithInvert, WithMargin } from './types';

export interface AlertKnownProps extends StyledProps, WithMargin, WithInvert {
  children: React.ReactNode;
  icon?: Icons;
  /** @default success */
  type: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export type AlertProps = ComponentProps<HTMLDivElement, AlertKnownProps>;

function getOptions(type: AlertProps['type'], colors: Theme['colors']) {
  const options = {
    success: {
      color: colors.green,
      icon: 'check-o',
    },
    warning: {
      color: colors.yellow,
      icon: 'danger',
    },
    error: {
      color: colors.red,
      icon: 'close-o',
    },
    info: {
      color: colors.blue,
      icon: 'info',
    },
    neutral: {
      color: colors.purple,
      icon: 'loadbar-alt',
    },
  } as const;

  return options[type];
}

export const StyledAlert = styled(
  'div',
  styledOptions,
)<AlertProps>(props => {
  const { invert } = props;
  const { grayDark, lightColor, radius, spacing, white } = getTheme(props);
  let backgroundColor = isDarkMode(props) ? lightColor : grayDark;
  let color = isDarkMode(props) ? grayDark : white;

  if (invert) {
    backgroundColor = isDarkMode(props) ? grayDark : lightColor;
    color = isDarkMode(props) ? white : grayDark;
  }

  return css`
    ${baseStyles(props)};
    ${marginStyles(props)};
    align-items: center;
    background-color: ${backgroundColor};
    border-radius: ${radius.xs};
    color: ${color};
    display: flex;
    overflow: hidden;
    padding: ${spacing.md};
    position: relative;
    max-width: 380px;
    width: 100%;

    [data-component-name='Text'] {
      margin-left: ${spacing.xs};
    }
  `;
});

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { children, icon, type } = props;
  const { colors } = getTheme({ theme: useTheme() });

  const selected = getOptions(type, colors);

  return (
    <StyledAlert ref={ref} data-component-name="Alert" {...props}>
      <Icon color={selected.color} name={icon || selected.icon} size={20} />
      <Text size="mid">{children}</Text>
    </StyledAlert>
  );
});

Alert.defaultProps = {
  type: 'success',
};
Alert.displayName = 'Alert';
