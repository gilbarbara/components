import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';

import { getColorVariant, getTheme, px } from './modules/helpers';
import { baseStyles, getStyledOptions, marginStyles, textStyles } from './modules/system';
import {
  ComponentProps,
  Direction,
  Sizes,
  Spacing,
  StyledProps,
  WithAlign,
  WithChildrenOptional,
  WithColor,
  WithMargin,
  WithTextSize,
} from './types';

export interface DividerKnownProps
  extends StyledProps,
    WithAlign,
    WithChildrenOptional,
    WithColor,
    WithMargin,
    WithTextSize {
  /** @default sm */
  borderSize?: Sizes;
  /** @default solid */
  borderStyle?: 'solid' | 'dashed' | 'dotted';
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
}

export type DividerProps = ComponentProps<HTMLDivElement, DividerKnownProps>;

const borderSizes = {
  sm: '1px',
  md: '2px',
  lg: '4px',
};

const StyledDivider = styled(
  'div',
  getStyledOptions('type'),
)<DividerProps>(props => {
  const {
    align,
    borderSize = 'sm',
    borderStyle,
    children,
    direction,
    gap = 'xs',
    length = '100%',
    shade,
    variant = 'gray',
  } = props;
  const { spacing, variants } = getTheme(props);
  const isHorizontal = direction === 'horizontal';

  const { bg } = getColorVariant(variant, shade, variants);

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
    let borderLeftWidth = '50%';
    let borderRightWidth = '50%';

    if (align === 'left') {
      borderLeftWidth = '5%';
      borderRightWidth = 'calc(95%)';
    }

    if (align === 'right') {
      borderLeftWidth = 'calc(95%)';
      borderRightWidth = '5%';
    }

    return css`
      ${baseStyles(props)};
      align-items: center;
      color: ${bg};
      display: flex;
      flex-direction: row;
      line-height: 1;
      position: relative;
      ${margin};
      width: ${px(length)};
      ${marginStyles(props)};
      ${textStyles(props)};

      &:before,
      &:after {
        content: '';
        border-top: ${borderSizes[borderSize]} ${borderStyle} ${bg};
      }

      &:before {
        margin-right: ${spacing[gap]};
        width: ${borderLeftWidth};
      }

      &:after {
        margin-left: ${spacing[gap]};
        width: ${borderRightWidth};
      }
    `;
  }

  return css`
    border-bottom: ${isHorizontal ? `${selectedDimension} ${borderStyle} ${bg}` : undefined};
    border-left: ${isHorizontal ? undefined : `${selectedDimension} ${borderStyle} ${bg}`};
    height: ${isHorizontal ? undefined : px(length)};
    ${margin};
    text-indent: -9999px;
    width: ${px(isHorizontal ? length : selectedDimension)};
    ${marginStyles(props)};
  `;
});

export function Divider(props: DividerProps): JSX.Element {
  return <StyledDivider data-component-name="Divider" role="separator" {...props} />;
}

Divider.defaultProps = {
  align: 'center',
  borderSize: 'sm',
  borderStyle: 'solid',
  direction: 'horizontal',
  gap: 'xs',
  length: '100%',
  shade: 'light',
  size: 'regular',
  variant: 'gray',
};
