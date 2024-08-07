import { Children, forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { SetRequired, Simplify } from '@gilbarbara/types';
import { StandardShorthandProperties } from 'csstype';

import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';
import {
  baseStyles,
  borderStyles,
  flexItemStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  paddingStyles,
  radiusStyles,
  shadowStyles,
} from '~/modules/system';

import {
  Direction,
  Spacing,
  StyledProps,
  WithBorder,
  WithChildren,
  WithFlexItem,
  WithHTMLAttributes,
  WithLayout,
  WithMargin,
  WithPadding,
  WithRadius,
  WithShadow,
} from '~/types';

export interface SpacerKnownProps
  extends StyledProps,
    WithBorder,
    WithChildren,
    WithFlexItem,
    WithHTMLAttributes,
    WithLayout,
    WithMargin,
    WithPadding,
    WithRadius,
    WithShadow {
  /**
   * The spacer direction.
   * @default horizontal
   */
  direction?: Direction;
  /**
   * Distribution of the children in the spacer.
   * @default start
   */
  distribution?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * The gap between the children.
   * @default sm
   */
  gap?: Spacing | [rowGap: Spacing, columnGap: Spacing];
  /**
   * Expand child width (Vertical only)
   * @default false
   */
  grow?: boolean;
  /**
   * Reverse the order of the children.
   * @default false
   */
  reverse?: boolean;
  /**
   * The vertical alignment of the children.
   * @default center
   */
  verticalAlign?: 'center' | 'end' | 'start' | 'stretch';
  /**
   * Wrap the children if they don't fit in the container.
   * @default true
   */
  wrap?: boolean;
}

export type SpacerProps = Simplify<SpacerKnownProps>;

export const defaultProps = {
  direction: 'horizontal',
  distribution: 'start',
  gap: 'sm',
  grow: false,
  reverse: false,
  shadow: false,
  verticalAlign: 'center',
  wrap: true,
} satisfies Omit<SpacerProps, 'children'>;

export const StyledSpacer = styled(
  'div',
  getStyledOptions('fill'),
)<SetRequired<SpacerProps, 'gap'>>(props => {
  const { direction, distribution, gap, reverse, verticalAlign, wrap } = props;
  const { spacing } = getTheme(props);
  const isHorizontal = direction === 'horizontal';

  const flexGap = Array.isArray(gap) ? gap.map(value => spacing[value]).join(' ') : spacing[gap];

  let distributionStyles;

  if (distribution) {
    distributionStyles = css`
      justify-content: ${isHorizontal ? distribution : verticalAlign};
    `;
  }

  return css`
    ${baseStyles(props)};
    align-items: ${isHorizontal ? verticalAlign : distribution};
    display: flex;
    flex-direction: ${direction === 'vertical'
      ? `column${reverse ? '-reverse' : ''}`
      : `row${reverse ? '-reverse' : ''}`};
    flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
    gap: ${flexGap};
    ${distributionStyles};
    ${borderStyles(props)};
    ${flexItemStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

const StyledSpacerItem = styled(
  'div',
  getStyledOptions('fill'),
)<Partial<SpacerProps> & { flex?: StandardShorthandProperties['flex'] }>(props => {
  const { direction, flex, grow } = props;
  const isHorizontal = direction === 'horizontal';

  return css`
    display: ${isHorizontal ? 'flex' : 'block'};
    flex: ${flex};
    width: ${!isHorizontal && grow ? '100%' : 'auto'};
  `;
});

/**
 * You can use a "data-flex" property on the children to grow or shrink to fit the space available.
 */
export const Spacer = forwardRef<HTMLDivElement, SpacerProps>((props, ref) => {
  const { children, ...rest } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  const nodes = Children.toArray(children).map((child, index) => {
    const key = `SpacerItem-${index}`;
    const flex = isValidElement(child) ? child.props['data-flex'] : undefined;

    return (
      <StyledSpacerItem key={key} flex={flex} {...rest} {...getDataAttributes('SpacerItem')}>
        {child}
      </StyledSpacerItem>
    );
  });

  return (
    <StyledSpacer ref={ref} {...getDataAttributes('Spacer')} {...rest}>
      {nodes}
    </StyledSpacer>
  );
});

Spacer.displayName = 'Spacer';
