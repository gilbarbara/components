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
  WithChildrenOptional,
  WithColor,
  WithMargin,
  WithTextSize,
} from './types';

export interface DividerKnownProps
  extends StyledProps,
    WithChildrenOptional,
    WithColor,
    WithMargin,
    WithTextSize {
  /** @default solid */
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  /** @default sm */
  dimension?: Sizes;
  /** @default horizontal */
  direction?: Direction;
  /** @default xs */
  gap?: Spacing;
  /** @default 100% */
  length?: StringOrNumber;
}

export type DividerProps = ComponentProps<HTMLDivElement, DividerKnownProps>;

const dimensions = {
  sm: '1px',
  md: '2px',
  lg: '4px',
};

const StyledDivider = styled(
  'div',
  getStyledOptions('type'),
)<DividerProps>(props => {
  const {
    borderStyle,
    children,
    dimension = 'sm',
    direction,
    gap = 'xs',
    length = '100%',
    shade,
    variant = 'gray',
  } = props;
  const { spacing, variants } = getTheme(props);
  const isHorizontal = direction === 'horizontal';

  const { bg } = getColorVariant(variant, shade, variants);

  const selectedDimension = dimensions[dimension];
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
    return css`
      ${baseStyles(props)};
      align-items: center;
      color: ${bg};
      display: flex;
      flex-direction: row;
      line-height: 1;
      ${margin};
      width: ${px(length)};
      ${marginStyles(props)};
      ${textStyles(props)};

      &:before,
      &:after {
        content: '';
        flex: 1 1;
        border-bottom: ${dimensions[dimension]} ${borderStyle} ${bg};
        margin: auto;
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
  borderStyle: 'solid',
  dimension: 'sm',
  direction: 'horizontal',
  gap: 'xs',
  length: '100%',
  shade: 'light',
  size: 'mid',
  variant: 'gray',
};
