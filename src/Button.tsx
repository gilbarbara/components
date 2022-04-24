import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject } from '@gilbarbara/types';

import { Icon } from './Icon';
import { button } from './modules/components';
import { getColorVariant, getTheme, px } from './modules/helpers';
import {
  appearanceStyles,
  backgroundStyles,
  baseStyles,
  paddingStyles,
  styledOptions,
} from './modules/system';
import {
  ButtonTypes,
  ComponentProps,
  StyledProps,
  WithColor,
  WithComponentSize,
  WithInvert,
  WithPadding,
  WithTransparent,
} from './types';

export interface ButtonKnownProps
  extends StyledProps,
    WithColor,
    WithComponentSize,
    WithInvert,
    WithPadding,
    WithTransparent {
  /**
   * Use the container full width
   * @default false
   */
  block?: boolean;
  /**
   * Add an animation to the background
   * @default false
   */
  busy?: boolean;
  children: React.ReactNode;
  /**
   * Use equal padding on all sides
   * @default false
   */
  square?: boolean;
  /**
   * The button type
   * @default button
   */
  type?: ButtonTypes;
  /**
   * Double the horizontal padding
   * @default false
   */
  wide?: boolean;
}

export type ButtonProps = ComponentProps<HTMLButtonElement, ButtonKnownProps>;

export const StyledButton = styled(
  'button',
  styledOptions,
)<ButtonProps>(props => {
  const { block, busy, shade, size = 'md', square, transparent, variant = 'primary', wide } = props;
  const { grayLighter, grayMid, spacing, variants } = getTheme(props);
  const { borderRadius, dimension, fontSize, fontWeight, lineHeight, padding } = button;
  let buttonPadding = `${padding[size][0]} ${
    wide ? px(parseInt(padding[size][1], 10) * 2) : padding[size][1]
  }`;

  if (square) {
    buttonPadding = spacing.xxs;
  }

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    ${backgroundStyles(props)};
    align-items: center;
    border-radius: ${transparent ? 0 : borderRadius[size]};
    box-shadow: none;
    cursor: pointer;
    display: inline-flex;
    font-size: ${fontSize[size]};
    font-weight: ${fontWeight};
    min-height: ${dimension[size]};
    min-width: ${dimension[size]};
    justify-content: center;
    line-height: ${lineHeight[size]};
    overflow: hidden;
    padding: ${buttonPadding};
    ${paddingStyles(props)}
    position: relative;
    transition: background-color 0.6s, border-color 0.6s;
    width: ${block ? '100%' : 'auto'};

    &:disabled {
      background-color: ${grayLighter};
      border-color: ${grayLighter};
      color: ${grayMid};
      pointer-events: none;
    }

    &:focus {
      outline-color: ${getColorVariant(variant, shade, variants).bg};
    }

    ${!!busy &&
    css`
      pointer-events: none;
    `};
  `;
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { busy, children, size = 'md', square } = props;
  const { fontSize } = button;
  const content: AnyObject = {
    children,
    icon: !!busy && <Icon ml="sm" name="spinner" size={parseInt(fontSize[size], 10) + 4} spin />,
  };

  if (square && busy) {
    content.children = <Icon name="spinner" size={parseInt(fontSize[size], 10) + 4} spin />;
    content.icon = '';
  }

  return (
    <StyledButton ref={ref} data-component-name="Button" {...props}>
      {content.children}
      {content.icon}
    </StyledButton>
  );
});

Button.defaultProps = {
  shade: 'mid',
  size: 'md',
  type: 'button',
  variant: 'primary',
};
Button.displayName = 'Button';
