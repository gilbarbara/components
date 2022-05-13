import { Children, forwardRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getTheme } from './modules/helpers';
import { baseStyles, getStyledOptions, layoutStyles, marginStyles } from './modules/system';
import { ComponentProps, Spacing, StyledProps, WithLayout, WithMargin } from './types';

export interface SpacerKnownProps extends StyledProps, WithLayout, WithMargin {
  /** @default center */
  align?: 'baseline' | 'center' | 'end' | 'start';
  children: ReactNode;
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
  /** @default true */
  wrap?: boolean;
}

export type SpacerProps = ComponentProps<HTMLDivElement, SpacerKnownProps>;

export const StyledSpacer = styled(
  'div',
  getStyledOptions(),
)<SpacerProps>(props => {
  const { align, direction, distribution, gap = 'sm', grow, wrap } = props;
  const { spacing } = getTheme(props);
  const isHorizontal = direction === 'horizontal';

  let distributionStyles;

  if (distribution) {
    distributionStyles = css`
      justify-content: ${isHorizontal ? distribution : align};
    `;
  }

  return css`
    ${baseStyles(props)};
    align-items: ${isHorizontal ? align : distribution};
    display: flex;
    flex-direction: ${direction === 'vertical' ? 'column' : 'row'};
    flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
    ${distributionStyles};
    ${layoutStyles(props)};
    ${marginStyles(props)};

    > [data-component-name='SpacerItem'] {
      width: ${!isHorizontal && grow ? '100%' : 'auto'};

      &:not(:last-of-type) {
        margin-right: ${isHorizontal ? spacing[gap] : undefined};
        margin-bottom: ${!isHorizontal ? spacing[gap] : undefined};
      }
    }
  `;
});

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>((props, ref) => {
  const { children, ...rest } = props;

  const nodes = Children.toArray(children).map((child, index) => {
    const key = `SpacerItem-${index}`;

    return (
      <div key={key} data-component-name="SpacerItem">
        {child}
      </div>
    );
  });

  return (
    <StyledSpacer ref={ref} data-component-name="Spacer" {...rest}>
      {nodes}
    </StyledSpacer>
  );
});

Spacer.defaultProps = {
  align: 'center',
  direction: 'horizontal',
  distribution: 'start',
  gap: 'sm',
  grow: false,
  wrap: true,
};
