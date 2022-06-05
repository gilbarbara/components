import { Children, forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StandardShorthandProperties } from 'csstype';

import { getTheme } from './modules/helpers';
import {
  baseStyles,
  flexItemStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
} from './modules/system';
import {
  ComponentProps,
  Direction,
  Spacing,
  StyledProps,
  WithChildren,
  WithFlexItem,
  WithLayout,
  WithMargin,
} from './types';

export interface SpacerKnownProps
  extends StyledProps,
    WithChildren,
    WithFlexItem,
    WithLayout,
    WithMargin {
  /** @default horizontal */
  direction?: Direction;
  /** @default start */
  distribution?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /** @default sm */
  gap?: Spacing;
  /**
   * Expand child width (Vertical only)
   * @default false
   */
  grow?: boolean;
  /**
   * Horizontal only
   * @default center */
  verticalAlign?: 'center' | 'end' | 'start';
  /** @default true */
  wrap?: boolean;
}

export type SpacerProps = ComponentProps<HTMLDivElement, SpacerKnownProps>;

export const StyledSpacer = styled(
  'div',
  getStyledOptions('direction'),
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
    ${flexItemStyles(props)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
  `;
});

const StyledSpacerItem = styled(
  'div',
  getStyledOptions('direction'),
)<Partial<SpacerProps> & { flex?: StandardShorthandProperties['flex'] }>(props => {
  const { direction, flex, gap = 'sm', grow } = props;
  const { spacing } = getTheme(props);
  const isHorizontal = direction === 'horizontal';

  return css`
    display: ${isHorizontal ? 'flex' : 'block'};
    flex: ${flex};
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
  const { children, ...rest } = props;

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

Spacer.defaultProps = {
  direction: 'horizontal',
  distribution: 'start',
  gap: 'sm',
  grow: false,
  verticalAlign: 'center',
  wrap: true,
};
