import { forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  baseStyles,
  borderStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  radiusStyles,
} from '~/modules/system';

import { Icon } from '~/components/Icon';
import { Text } from '~/components/Text';

import {
  Icons,
  OmitElementProps,
  StyledProps,
  WithBorder,
  WithChildren,
  WithFlexBox,
  WithInvert,
  WithMargin,
  WithPadding,
  WithRadius,
} from '~/types';

export interface AlertKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    Pick<WithFlexBox, 'align'>,
    WithInvert,
    WithMargin,
    WithPadding,
    WithRadius {
  icon?: Icons;
  /** @default success */
  type: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export type AlertProps = OmitElementProps<HTMLDivElement, AlertKnownProps>;

function getColor(type: AlertProps['type'], invert?: boolean) {
  const types = {
    success: invert ? 'green' : 'green.50',
    warning: invert ? 'orange' : 'orange.50',
    error: invert ? 'red' : 'red.50',
    info: invert ? 'blue' : 'blue.50',
    neutral: invert ? 'gray' : 'gray.50',
  } as const;

  return types[type];
}

function getIconOptions(type: AlertProps['type']) {
  const options = {
    success: {
      color: 'green',
      icon: 'check-circle',
    },
    warning: {
      color: 'orange',
      icon: 'danger-circle',
    },
    error: {
      color: 'red',
      icon: 'close-circle',
    },
    info: {
      color: 'blue',
      icon: 'info-circle',
    },
    neutral: {
      color: 'gray',
      icon: 'message-circle',
    },
  } as const;

  return options[type];
}

export const defaultProps = {
  align: 'center',
  invert: false,
  padding: 'md',
  radius: 'xs',
  type: 'success',
} satisfies Omit<AlertProps, 'children'>;

export const StyledAlert = styled(
  'div',
  getStyledOptions('type'),
)<AlertProps>(props => {
  const { align, invert, type } = props;
  const { spacing, white, ...theme } = getTheme(props);
  const { mainColor, textColor } = getColorTokens(getColor(type), null, theme);
  let backgroundColor = mainColor;
  let borderColor = mainColor;

  if (invert) {
    const variant = getColorTokens(getColor(type, true), null, theme);

    backgroundColor = white;
    borderColor = variant.mainColor;
  }

  return css`
    ${baseStyles(props)};
    align-items: ${align};
    background-color: ${backgroundColor};
    border: 1px solid ${borderColor};
    color: ${textColor};
    display: flex;
    overflow: hidden;
    position: relative;
    max-width: 380px;
    width: 100%;
    ${borderStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};

    > [data-component-name='Text'] {
      margin-left: ${spacing.xs};
    }
  `;
});

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { children, icon, type, ...rest } = { ...defaultProps, ...props };
  const selected = getIconOptions(type);

  return (
    <StyledAlert ref={ref} data-component-name="Alert" type={type} {...rest}>
      <Icon color={selected.color} name={icon ?? selected.icon} size={20} />
      {isValidElement(children) ? children : <Text size="mid">{children}</Text>}
    </StyledAlert>
  );
});

Alert.displayName = 'Alert';
