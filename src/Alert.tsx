import { forwardRef } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import { getTheme } from './modules/helpers';
import { baseStyles, getStyledOptions, isDarkMode, marginStyles } from './modules/system';
import { Text } from './Text';
import {
  ComponentProps,
  Icons,
  StyledProps,
  Theme,
  WithChildren,
  WithInvert,
  WithMargin,
} from './types';

export interface AlertKnownProps extends StyledProps, WithChildren, WithMargin, WithInvert {
  icon?: Icons;
  /** @default success */
  type: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export type AlertProps = ComponentProps<HTMLDivElement, AlertKnownProps>;

function getOptions(type: AlertProps['type'], colors: Theme['colors'], darkMode: boolean) {
  const options = {
    success: {
      color: colors.green,
      icon: 'check-o',
    },
    warning: {
      color: darkMode ? colors.orange : colors.yellow,
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
      color: darkMode ? '#000' : '#fff',
      icon: 'data',
    },
  } as const;

  return options[type];
}

export const StyledAlert = styled(
  'div',
  getStyledOptions(),
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
    ${marginStyles(props)};

    [data-component-name='Text'] {
      margin-left: ${spacing.xs};
    }
  `;
});

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { children, icon, invert, type } = props;
  const { colors, darkMode } = getTheme({ theme: useTheme() });

  const selected = getOptions(type, colors, !!darkMode || !!invert);

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
