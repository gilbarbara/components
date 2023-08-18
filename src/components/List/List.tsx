import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { pick } from '@gilbarbara/helpers';

import { recursiveChildrenEnhancer } from '~/modules/helpers';
import {
  baseStyles,
  borderStyles,
  getStyledOptions,
  layoutStyles,
  marginStyles,
  radiusStyles,
  shadowStyles,
} from '~/modules/system';

import { ListItem } from './Item';
import { defaultProps, ListProps } from './utils';

export const StyledList = styled(
  'ul',
  getStyledOptions(),
)<ListProps>(props => {
  const { border, borderColor, direction } = props;

  const borderProps = { ...props };

  if (border === true) {
    borderProps.border = [{ side: 'all', color: borderColor }];
  }

  return css`
    ${baseStyles(props)};
    display: flex;
    flex-direction: ${direction === 'horizontal' ? 'row' : 'column'};
    list-style-position: inside;
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
    ${borderStyles(borderProps)};
    ${layoutStyles(props)};
    ${marginStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};
  `;
});

export const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const { children, ...rest } = { ...defaultProps, ...props };

  return (
    <StyledList ref={ref} data-component-name="List" {...rest}>
      {recursiveChildrenEnhancer(
        children,
        pick(rest, 'border', 'borderColor', 'direction', 'divider', 'size'),
        { componentType: ListItem },
      )}
    </StyledList>
  );
});

List.displayName = 'List';

export { defaultProps } from './utils';
