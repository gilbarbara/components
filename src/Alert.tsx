import { forwardRef, isValidElement } from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Icon } from './Icon';
import { getColorVariant, getTheme } from './modules/helpers';
import {
  baseStyles,
  borderStyles,
  getStyledOptions,
  marginStyles,
  paddingStyles,
  radiusStyles,
} from './modules/system';
import { Text } from './Text';
import {
  ComponentProps,
  Icons,
  StyledProps,
  Theme,
  WithBorder,
  WithChildren,
  WithFlexBox,
  WithInvert,
  WithMargin,
  WithPadding,
  WithRadius,
} from './types';

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

export type AlertProps = ComponentProps<HTMLDivElement, AlertKnownProps>;

function getVariantName(type: AlertProps['type']) {
  const variants = {
    success: 'green',
    warning: 'orange',
    error: 'red',
    info: 'blue',
    neutral: 'gray',
  } as const;

  return variants[type];
}

function getIconOptions(type: AlertProps['type'], variants: Theme['variants']) {
  const options = {
    success: {
      color: variants.green.mid.bg,
      icon: 'check-circle',
    },
    warning: {
      color: variants.orange.mid.bg,
      icon: 'danger-circle',
    },
    error: {
      color: variants.red.mid.bg,
      icon: 'close-circle',
    },
    info: {
      color: variants.blue.mid.bg,
      icon: 'info-circle',
    },
    neutral: {
      color: variants.gray.mid.bg,
      icon: 'message-circle',
    },
  } as const;

  return options[type];
}

export const StyledAlert = styled(
  'div',
  getStyledOptions('type'),
)<AlertProps>(props => {
  const { align = 'center', invert, type } = props;
  const { spacing, variants, white } = getTheme(props);

  const { bg, color } = getColorVariant(getVariantName(type), 'lighter', variants);
  let backgroundColor = bg;
  let borderColor = bg;

  if (invert) {
    const variant = getColorVariant(getVariantName(type), 'mid', variants);

    backgroundColor = white;
    borderColor = variant.bg;
  }

  return css`
    ${baseStyles(props)};
    align-items: ${align};
    background-color: ${backgroundColor};
    border: 1px solid ${borderColor};
    color: ${color};
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
  const { children, icon, type } = props;
  const { variants } = getTheme({ theme: useTheme() });

  const selected = getIconOptions(type, variants);

  return (
    <StyledAlert ref={ref} data-component-name="Alert" {...props}>
      <Icon color={selected.color} name={icon || selected.icon} size={20} />
      {isValidElement(children) ? children : <Text size="mid">{children}</Text>}
    </StyledAlert>
  );
});

Alert.defaultProps = {
  align: 'center',
  invert: false,
  padding: 'md',
  radius: 'xs',
  type: 'success',
};
