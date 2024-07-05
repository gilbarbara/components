import { forwardRef, isValidElement, MouseEvent, ReactNode, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { useMergeRefs } from '@gilbarbara/hooks';
import { PlainObject, SetRequired, Simplify } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

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
import { Ripple, useRipple } from '~/components/Ripple';

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
   * Disable the button ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
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

export type ButtonProps = Simplify<OmitElementProps<HTMLButtonElement, ButtonKnownProps>>;

export const defaultProps = {
  bg: 'primary',
  block: false,
  busy: false,
  disabled: false,
  disableRipple: false,
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
  const { onClick, ...mergedProps } = mergeProps(defaultProps, props);
  const {
    bg,
    busy,
    children,
    disableRipple,
    endContent,
    iconOnly,
    size,
    spinner,
    spinnerPosition,
    startContent,
  } = mergedProps;

  const { onClick: onClickRipple, ...rippleProps } = useRipple();
  const localRef = useRef<HTMLButtonElement | null>(null);
  const mergedRefs = useMergeRefs(localRef, ref);
  const { getDataAttributes, theme } = useTheme();

  const { fontSize } = theme.button[size];

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (busy || disableRipple) {
      return;
    }

    onClickRipple(event);
  };

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

  if (!disableRipple) {
    content.ripple = <Ripple color={bg} {...rippleProps} />;
  }

  return (
    <StyledButton
      ref={mergedRefs}
      {...getDataAttributes('Button')}
      onClick={handleClick}
      {...mergedProps}
    >
      {content.startContent}
      {spinnerPosition === 'start' && content.spinner}
      {content.children}
      {spinnerPosition === 'end' && content.spinner}
      {content.endContent}
      {content.ripple}
    </StyledButton>
  );
});

Button.displayName = 'Button';
