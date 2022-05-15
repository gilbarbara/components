import { Children, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from './modules/helpers';
import { baseStyles, getStyledOptions, layoutStyles, marginStyles } from './modules/system';
import {
  ComponentProps,
  Spacing,
  StyledProps,
  WithChildren,
  WithLayout,
  WithMargin,
} from './types';

export interface SpacerKnownProps extends StyledProps, WithChildren, WithLayout, WithMargin {
  /** @default horizontal */
  direction?: 'horizontal' | 'vertical';
  /** @default start */
  distribution?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /** @default sm */
  gap?: Spacing;
  /**
   * Expand child width (Vertical only)
   * @default false
   */
  grow?: boolean;
  /** @default center */
  verticalAlign?: 'center' | 'end' | 'start';
  /** @default true */
  wrap?: boolean;
}

export type SpacerProps = ComponentProps<HTMLDivElement, SpacerKnownProps>;

export const StyledSpacer = styled(
  'div',
  getStyledOptions(),
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
    ${layoutStyles(props)};
    ${marginStyles(props)};
  `;
});

const StyledSpacerItem = styled.div<Partial<SpacerProps>>(props => {
  const { direction, gap = 'sm', grow } = props;
  const { spacing } = getTheme(props);
  const isHorizontal = direction === 'horizontal';

  return css`
    display: ${isHorizontal ? 'flex' : 'block'};
    width: ${!isHorizontal && grow ? '100%' : 'auto'};

    &:not(:last-of-type) {
      margin-right: ${isHorizontal ? spacing[gap] : undefined};
      margin-bottom: ${!isHorizontal ? spacing[gap] : undefined};
    }
  `;
});

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>((props, ref) => {
  const { children, ...rest } = props;

  const nodes = Children.toArray(children).map((child, index) => {
    const key = `SpacerItem-${index}`;

    return (
      <StyledSpacerItem key={key} data-component-name="SpacerItem" {...rest}>
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
