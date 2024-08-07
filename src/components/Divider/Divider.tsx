import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { SetRequired, Simplify, StringOrNumber } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { textDefaultOptions } from '~/modules/options';
import { baseStyles, getStyledOptions, marginStyles, textStyles } from '~/modules/system';

import {
  Direction,
  Sizes,
  Spacing,
  SpacingOrZero,
  StyledProps,
  VariantWithTones,
  WithAlign,
  WithChildrenOptional,
  WithHTMLAttributes,
  WithMargin,
  WithTextOptions,
} from '~/types';

export interface DividerKnownProps
  extends StyledProps,
    WithAlign,
    WithChildrenOptional,
    WithHTMLAttributes,
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
  /**
   * The divider margin
   * @default md
   */
  spacing?: SpacingOrZero | [start: SpacingOrZero, end: SpacingOrZero];
}

export type DividerProps = Simplify<DividerKnownProps>;

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
  spacing: 'md',
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
    spacing,
  } = props;
  const { spacing: spacingTheme, ...theme } = getTheme(props);
  const isHorizontal = direction === 'horizontal';

  let marginStart: string | number = 0;
  let marginEnd: string | number = 0;
  let mainColor = color;

  if (spacing) {
    if (Array.isArray(spacing)) {
      marginStart = spacing[0] ? spacingTheme[spacing[0]] : 0;
      marginEnd = spacing[1] ? spacingTheme[spacing[1]] : 0;
    } else {
      marginStart = spacingTheme[spacing];
      marginEnd = spacingTheme[spacing];
    }
  }

  if (color !== 'transparent') {
    ({ mainColor } = getColorTokens(color, null, theme));
  }

  const selectedDimension = borderSizes[borderSize];
  const margin = isHorizontal
    ? css`
        margin-bottom: ${marginStart};
        margin-top: ${marginEnd};
      `
    : css`
        margin-left: ${marginStart};
        margin-right: ${marginEnd};
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
        margin-right: ${spacingTheme[gap]};
      }

      &:after {
        margin-left: ${spacingTheme[gap]};
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
  const mergedProps = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  return <StyledDivider {...getDataAttributes('Divider')} role="separator" {...mergedProps} />;
}

Divider.displayName = 'Divider';
