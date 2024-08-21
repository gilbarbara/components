import { forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';
import { Text } from '~/components/Text';

import { WithTheme } from '~/types';

import { AlertProps, getColor, getIconOptions, useAlert } from './useAlert';

export const StyledAlert = styled('div', getStyledOptions('type'))<AlertProps & WithTheme>(
  {
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  props => {
    const { align, direction, light, theme, type } = props;
    const { mainColor, textColor } = getColorTokens(getColor(type, light), null, theme);

    return css`
      align-items: ${align};
      background-color: ${mainColor};
      color: ${textColor};
      flex-direction: ${direction};
      width: 100%;
      ${getStyles(props)};
    `;
  },
);

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useAlert(props);
  const { children, direction, hideIcon, icon, iconSize, light, type, ...rest } = componentProps;
  const selected = getIconOptions(componentProps);

  return (
    <StyledAlert
      ref={ref}
      {...getDataAttributes('Alert')}
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

export { type AlertProps, defaultProps } from './useAlert';
