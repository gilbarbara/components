import { forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SetRequired } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';

import { Icon } from '~/components/Icon';
import { Text } from '~/components/Text';

import { WithTheme } from '~/types';

import { AlertProps, getColor, getIconOptions, useAlert } from './useAlert';

export const StyledAlert = styled('div', getStyledOptions('type'))<
  SetRequired<AlertProps, 'variant'> & WithTheme
>(
  {
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  props => {
    const { align, bg, direction, theme, type, variant } = props;
    let { mainColor, textColor } = getColorTokens(getColor(type, variant === 'light'), null, theme);

    if (bg) {
      ({ mainColor, textColor } = getColorTokens(bg, null, theme));
    }

    let bgColor = mainColor;
    let border: string | undefined;
    let selectedColor = textColor;

    if (variant === 'bordered') {
      border = `1px solid ${mainColor}`;
      bgColor = 'transparent';
      selectedColor = mainColor;
    } else if (variant === 'light') {
      selectedColor = getColorTokens(getColor(type), null, theme).mainColor;
    }

    return css`
      align-items: ${align};
      background-color: ${bgColor};
      border: ${border};
      color: ${selectedColor};
      flex-direction: ${direction};
      width: 100%;
      ${getStyles(props, { skipBorder: true })};
    `;
  },
);

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useAlert(props);
  const { children, direction, hideIcon, icon, iconSize, type, ...rest } = componentProps;
  const selected = getIconOptions(componentProps);

  return (
    <StyledAlert
      ref={ref}
      {...getDataAttributes('Alert')}
      direction={direction}
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

export { defaultProps, type AlertProps } from './useAlert';
