import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnyObject } from '@gilbarbara/types';

import { Icon } from './Icon';
import { getColorVariant, getTheme, px } from './modules/helpers';
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
  WithChildren,
  WithColor,
  WithComponentSize,
  WithInvert,
  WithPadding,
  WithTransparent,
} from './types';

export interface ButtonKnownProps
  extends StyledProps,
    WithBlock,
    WithBusy,
    WithChildren,
    WithColor,
    WithComponentSize,
    WithInvert,
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

export type ButtonProps = ComponentProps<HTMLButtonElement, ButtonKnownProps>;

export const StyledButton = styled(
  'button',
  getStyledOptions(),
)<ButtonProps>(props => {
  const { block, busy, shade, shape, size = 'md', variant = 'primary', wide } = props;
  const { button, grayLighter, grayMid, radius, spacing, variants } = getTheme(props);
  const { borderRadius, fontSize, fontWeight, height, lineHeight, padding } = button;
  let buttonPadding = `${padding[size][0]} ${
    wide ? px(parseInt(padding[size][1], 10) * 2) : padding[size][1]
  }`;
  let selectedRadius = borderRadius[size];

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
    font-size: ${fontSize[size]};
    font-weight: ${fontWeight};
    min-height: ${height[size]};
    min-width: ${height[size]};
    justify-content: center;
    line-height: ${lineHeight[size]};
    overflow: hidden;
    padding: ${buttonPadding};
    position: relative;
    transition: background-color 0.6s, border-color 0.6s;
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { busy, children, shape, size = 'md' } = props;
  const {
    button: { fontSize },
  } = getTheme(props);

  const content: AnyObject = {
    children,
    icon: !!busy && <Icon ml="sm" name="spinner" size={parseInt(fontSize[size], 10) + 4} spin />,
  };

  if (shape && busy) {
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
  block: false,
  busy: false,
  disabled: false,
  invert: false,
  shade: 'mid',
  size: 'md',
  transparent: false,
  type: 'button',
  variant: 'primary',
  wide: false,
};
