import { Children, forwardRef, isValidElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';
import { StandardShorthandProperties } from 'csstype';

import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { SpacerProps, useSpacer } from './useSpacer';

export const StyledSpacer = styled(
  'div',
  getStyledOptions('fill'),
)<SetRequired<SpacerProps, 'gap'> & WithTheme>(props => {
  const { distribution, gap, orientation, reverse, theme, verticalAlign, wrap } = props;
  const { spacing } = theme;
  const isHorizontal = orientation === 'horizontal';

  const flexGap = Array.isArray(gap) ? gap.map(value => spacing[value]).join(' ') : spacing[gap];

  let distributionStyles;

  if (distribution) {
    distributionStyles = css`
      justify-content: ${isHorizontal ? distribution : verticalAlign};
    `;
  }

  return css`
    align-items: ${isHorizontal ? verticalAlign : distribution};
    display: flex;
    flex-direction: ${isHorizontal
      ? `row${reverse ? '-reverse' : ''}`
      : `column${reverse ? '-reverse' : ''}`};
    flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
    gap: ${flexGap};
    ${distributionStyles};
    ${getStyles(omit(props, 'gap', 'wrap'))};
  `;
});

const StyledSpacerItem = styled(
  'div',
  getStyledOptions('fill'),
)<Partial<SpacerProps> & { flex?: StandardShorthandProperties['flex'] }>(props => {
  const { flex, grow, orientation } = props;
  const isHorizontal = orientation === 'horizontal';

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
  const {
    componentProps: { children, ...rest },
    getDataAttributes,
  } = useSpacer(props);

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

export { defaultProps, type SpacerProps } from './useSpacer';
