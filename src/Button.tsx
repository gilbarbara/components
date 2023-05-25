import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';
import { SetRequired } from 'type-fest';

import { Icon } from './Icon';
import { getColorVariant, getTheme } from './modules/helpers';
import {
  appearanceStyles,
  backgroundStyles,
  baseStyles,
  getStyledOptions,
  paddingStyles,
} from './modules/system';
import {
  ButtonTypes,
  ComponentProps,
  StyledProps,
  WithBlock,
  WithBusy,
  WithButtonSize,
  WithChildren,
  WithColor,
  WithInvert,
  WithLight,
  WithPadding,
  WithTransparent,
} from './types';

export interface ButtonKnownProps
  extends StyledProps,
    WithBlock,
    WithBusy,
    WithChildren,
    WithColor,
    WithButtonSize,
    WithInvert,
    WithLight,
    WithPadding,
    WithTransparent {
  /**
   * A shaped button with equal padding on all sides
   */
  shape?: 'circle' | 'round' | 'square';
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

export type ButtonProps = ComponentProps<HTMLElement, ButtonKnownProps>;

export const defaultProps = {
  block: false,
  busy: false,
  disabled: false,
  invert: false,
  light: false,
  shade: 'mid',
  size: 'md',
  transparent: false,
  type: 'button',
  variant: 'primary',
  wide: false,
} satisfies Omit<ButtonProps, 'children'>;

export const StyledButton = styled(
  'button',
  getStyledOptions(),
)<SetRequired<ButtonProps, keyof typeof defaultProps>>(props => {
  const { block, busy, light, shade, shape, size, variant, wide } = props;
  const { button, grayLighter, grayMid, radius, spacing, variants } = getTheme(props);
  const { borderRadius, fontSize, fontWeight, height, lineHeight, padding } = button[size];
  let buttonPadding = `${padding[0]} ${wide ? px(parseInt(padding[1], 10) * 2) : padding[1]}`;
  let selectedRadius = borderRadius;

  if (shape) {
    buttonPadding = spacing.xxs;

    switch (shape) {
      case 'square': {
        selectedRadius = `0`;
        break;
      }
      case 'circle': {
        selectedRadius = radius.round;
        break;
      }
    }
  }

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    align-items: center;
    border-radius: ${selectedRadius};
    box-shadow: none;
    cursor: pointer;
    display: inline-flex;
    font-size: ${fontSize};
    font-weight: ${light ? 400 : fontWeight};
    min-height: ${height};
    min-width: ${height};
    justify-content: center;
    line-height: ${lineHeight};
    overflow: hidden;
    padding: ${buttonPadding};
    position: relative;
    text-decoration: none;
    transition:
      background-color 0.6s,
      border-color 0.6s;
    width: ${block ? '100%' : 'auto'};
    ${backgroundStyles(props)};
    ${paddingStyles(props)}

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

export const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { busy, children, shape, size } = { ...defaultProps, ...props };
  const { button } = getTheme(props);
  const { fontSize } = button[size];

  const content: PlainObject<ReactNode> = {
    children,
    icon: busy && <Icon ml="sm" name="spinner" size={parseInt(fontSize, 10) + 4} spin />,
  };

  if (shape && busy) {
    content.children = <Icon name="spinner" size={parseInt(fontSize, 10) + 4} spin />;
    content.icon = '';
  }

  return (
    <StyledButton
      ref={ref as ForwardedRef<HTMLButtonElement>}
      data-component-name="Button"
      {...defaultProps}
      {...props}
    >
      {content.children}
      {content.icon}
    </StyledButton>
  );
});

Button.displayName = 'Button';
