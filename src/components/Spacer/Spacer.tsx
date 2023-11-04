import { Children, forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Simplify } from '@gilbarbara/types';
import { StandardShorthandProperties } from 'csstype';

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
  OmitElementProps,
  Spacing,
  StyledProps,
  WithBorder,
  WithChildren,
  WithFlexItem,
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
   * The horizontal gap between the children.
   * @default sm
   */
  gap?: Spacing;
  /** The vertical gap between the children. */
  gapVertical?: Spacing;
  /**
   * Expand child width (Vertical only)
   * @default false
   */
  grow?: boolean;
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

export type SpacerProps = Simplify<OmitElementProps<HTMLDivElement, SpacerKnownProps>>;

export const defaultProps = {
  direction: 'horizontal',
  distribution: 'start',
  gap: 'sm',
  grow: false,
  shadow: false,
  verticalAlign: 'center',
  wrap: true,
} satisfies Omit<SpacerProps, 'children'>;

export const StyledSpacer = styled(
  'div',
  getStyledOptions('fill'),
)<SpacerProps>(props => {
  const { direction, distribution, verticalAlign, wrap } = props;
  const isHorizontal = direction === 'horizontal';

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
    flex-direction: ${direction === 'vertical' ? 'column' : 'row'};
    flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
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
  const { direction, flex, gap = 'sm', gapVertical, grow } = props;
  const { spacing } = getTheme(props);
  const isHorizontal = direction === 'horizontal';

  return css`
    display: ${isHorizontal ? 'flex' : 'block'};
    flex: ${flex};
    margin-bottom: ${gapVertical ? spacing[gapVertical] : undefined};
    width: ${!isHorizontal && grow ? '100%' : 'auto'};

    &:not(:last-of-type) {
      margin-right: ${isHorizontal ? spacing[gap] : undefined};
      margin-bottom: ${!isHorizontal ? spacing[gap] : undefined};
    }
  `;
});

/**
 * You can use a "data-flex" property on the children to grow or shrink to fit the space available.
 */
export const Spacer = forwardRef<HTMLDivElement, SpacerProps>((props, ref) => {
  const { children, ...rest } = { ...defaultProps, ...props };

  const nodes = Children.toArray(children).map((child, index) => {
    const key = `SpacerItem-${index}`;
    const flex = isValidElement(child) ? child.props['data-flex'] : undefined;

    return (
      <StyledSpacerItem key={key} flex={flex} {...rest} data-component-name="SpacerItem">
        {child}
      </StyledSpacerItem>
    );
  });

  return (
    <StyledSpacer ref={ref} data-component-name="Spacer" {...rest}>
      {nodes}
    </StyledSpacer>
  );
});

Spacer.displayName = 'Spacer';
