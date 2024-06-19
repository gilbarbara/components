import { ForwardedRef, forwardRef, isValidElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { PlainObject, SetRequired, Simplify } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  appearanceStyles,
  baseStyles,
  colorStyles,
  getDisableStyles,
  getOutlineStyles,
  getStyledOptions,
  hoverStyles,
  paddingStyles,
  radiusStyles,
} from '~/modules/system';

import { Icon } from '~/components/Icon';

import {
  ButtonTypes,
  OmitElementProps,
  Spacing,
  StyledProps,
  WithBlock,
  WithBusy,
  WithButtonSize,
  WithChildren,
  WithColorsDefaultBg,
  WithEndContent,
  WithLight,
  WithPadding,
  WithRadius,
  WithStartContent,
  WithVariant,
} from '~/types';

export interface ButtonKnownProps
  extends StyledProps,
    WithBlock,
    WithBusy,
    WithButtonSize,
    WithChildren,
    WithColorsDefaultBg,
    WithEndContent,
    WithLight,
    WithPadding,
    WithRadius,
    WithStartContent,
    WithVariant {
  /**
   * Space between the start and end content
   * @default xs
   */
  gap?: Spacing;
  /**
   * Whether the button should have the same width and height.
   * @default false
   */
  iconOnly?: boolean;
  /**
   * A custom spinner icon to show when the button is busy.
   */
  spinner?: ReactNode;
  /**
   * The spinner position
   * @default end
   */
  spinnerPosition?: 'start' | 'end';
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

export type ButtonProps = Simplify<OmitElementProps<HTMLElement, ButtonKnownProps>>;

export const defaultProps = {
  bg: 'primary',
  block: false,
  busy: false,
  disabled: false,
  gap: 'xs',
  iconOnly: false,
  light: false,
  size: 'md',
  spinnerPosition: 'end',
  type: 'button',
  variant: 'solid',
  wide: false,
} satisfies Omit<ButtonProps, 'children'>;

export const StyledButton = styled(
  'button',
  getStyledOptions(),
)<SetRequired<ButtonProps, keyof typeof defaultProps>>(props => {
  const { bg, block, busy, color, gap, iconOnly, light, size, wide } = props;
  const { button, grayScale, radius, spacing, ...theme } = getTheme(props);
  const { borderRadius, fontSize, fontWeight, height, lineHeight, padding } = button[size];
  let buttonPadding = `${padding[0]} ${wide ? px(parseInt(padding[1], 10) * 2) : padding[1]}`;

  if (iconOnly) {
    buttonPadding = '0px';
  }

  const { mainColor } = getColorTokens(bg, color, theme);

  return css`
    ${appearanceStyles};
    ${baseStyles(props)};
    align-items: center;
    border-radius: ${borderRadius};
    box-shadow: none;
    cursor: pointer;
    display: inline-flex;
    font-size: ${fontSize};
    font-weight: ${light ? 400 : fontWeight};
    gap: ${spacing[gap]};
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
    ${colorStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};

    &:disabled {
      ${getDisableStyles(props, { isButton: true })};
    }

    &:hover {
      ${hoverStyles(props)};
    }

    &:focus {
      ${getOutlineStyles(mainColor)};
    }

    ${busy &&
    css`
      pointer-events: none;
    `};
  `;
});

export const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { busy, children, endContent, iconOnly, size, spinner, spinnerPosition, startContent } = {
    ...defaultProps,
    ...props,
  };
  const { button } = getTheme(props);
  const { fontSize } = button[size];

  const content: PlainObject<ReactNode> = {
    children,
    spinner: busy && (spinner ?? <Icon name="spinner" size={parseInt(fontSize, 10) + 4} spin />),
  };

  if (iconOnly && busy) {
    content.children = content.spinner;
    content.spinner = '';
  }

  if (startContent) {
    content.startContent = isValidElement(startContent) ? (
      startContent
    ) : (
      <span>{startContent}</span>
    );
  }

  if (endContent) {
    content.endContent = isValidElement(endContent) ? endContent : <span>{endContent}</span>;
  }

  return (
    <StyledButton
      ref={ref as ForwardedRef<HTMLButtonElement>}
      data-component-name="Button"
      {...defaultProps}
      {...props}
    >
      {content.startContent}
      {spinnerPosition === 'start' && content.spinner}
      {content.children}
      {spinnerPosition === 'end' && content.spinner}
      {content.endContent}
    </StyledButton>
  );
});

Button.displayName = 'Button';
