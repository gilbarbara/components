import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { SetRequired, Simplify, StringOrNumber } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import { baseStyles, getStyledOptions, marginStyles, textStyles } from '~/modules/system';

import {
  Direction,
  OmitElementProps,
  Sizes,
  Spacing,
  StyledProps,
  VariantWithTones,
  WithAlign,
  WithChildrenOptional,
  WithMargin,
  WithTextOptions,
} from '~/types';

export interface DividerKnownProps
  extends StyledProps,
    WithAlign,
    WithChildrenOptional,
    WithMargin,
    WithTextOptions {
  /** @default sm */
  borderSize?: Sizes;
  /** @default solid */
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  /**
   * Component color
   * @default gray.200
   */
  color?: VariantWithTones;
  /** @default horizontal */
  direction?: Direction;
  /**
   * The distance between the text and borders
   *
   * @default xs
   */
  gap?: Spacing;
  /**
   * The width (for horizontal) or height (for vertical)
   *
   * @default 100%
   */
  length?: StringOrNumber;
  /**
   * The minimum border width for horizontal direction with text
   *
   * @default 50
   */
  minBorderWidth?: StringOrNumber;
}

export type DividerProps = Simplify<OmitElementProps<HTMLDivElement, DividerKnownProps>>;

const borderSizes = {
  sm: '1px',
  md: '2px',
  lg: '4px',
};

export const defaultProps = {
  ...textDefaultOptions,
  align: 'center',
  borderSize: 'sm',
  borderStyle: 'solid',
  color: 'gray.200',
  direction: 'horizontal',
  gap: 'xs',
  length: '100%',
  minBorderWidth: 50,
  size: 'md',
} satisfies DividerProps;

const StyledDivider = styled(
  'div',
  getStyledOptions('type'),
)<SetRequired<DividerProps, keyof typeof defaultProps>>(props => {
  const {
    align,
    borderSize,
    borderStyle,
    children,
    color,
    direction,
    gap,
    length,
    minBorderWidth,
  } = props;
  const { spacing, ...theme } = getTheme(props);
  const isHorizontal = direction === 'horizontal';

  const { mainColor } = getColorTokens(color, null, theme);

  const selectedDimension = borderSizes[borderSize];
  const margin = isHorizontal
    ? css`
        margin-bottom: ${spacing.md};
        margin-top: ${spacing.md};
      `
    : css`
        margin-left: ${spacing.md};
        margin-right: ${spacing.md};
      `;

  if (isHorizontal && children) {
    let textAlign = 'center';

    if (align === 'left') {
      textAlign = 'left';
    }

    if (align === 'right') {
      textAlign = 'right';
    }

    return css`
      ${baseStyles(props)};
      align-items: center;
      color: ${mainColor};
      display: flex;
      flex-direction: row;
      line-height: 1;
      position: relative;
      ${margin};
      text-align: ${textAlign};
      width: ${px(length)};
      ${marginStyles(props)};
      ${textStyles(props)};

      &:before,
      &:after {
        border-top: ${borderSizes[borderSize]} ${borderStyle} ${mainColor};
        content: '';
        display: inline-flex;
        min-width: ${px(minBorderWidth)};
        flex-grow: 1;
      }

      &:before {
        margin-right: ${spacing[gap]};
      }

      &:after {
        margin-left: ${spacing[gap]};
      }
    `;
  }

  return css`
    border-bottom: ${isHorizontal ? `${selectedDimension} ${borderStyle} ${mainColor}` : undefined};
    border-left: ${isHorizontal ? undefined : `${selectedDimension} ${borderStyle} ${mainColor}`};
    height: ${isHorizontal ? undefined : px(length)};
    ${margin};
    text-indent: -9999px;
    width: ${px(isHorizontal ? length : selectedDimension)};
    ${marginStyles(props)};
  `;
});

export function Divider(props: DividerProps) {
  return (
    <StyledDivider data-component-name="Divider" role="separator" {...defaultProps} {...props} />
  );
}

Divider.displayName = 'Divider';
