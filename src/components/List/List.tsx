import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';

import { enhanceChildren } from '~/modules/react-helpers';
import { getStyledOptions, getStyles } from '~/modules/system';

import { WithBorder, WithTheme } from '~/types';

import { ListItem } from './Item';
import { getBorderColor, ListProps, useList } from './useList';

export const StyledList = styled('ul', getStyledOptions())<ListProps & WithTheme>(
  {
    display: 'flex',
    listStylePosition: 'inside',
    listStyleType: 'none',
    margin: 0,
    overflow: 'hidden',
    padding: 0,
  },
  props => {
    const { hideBorder, orientation } = props;

    const borderProps: WithBorder = {};

    if (!hideBorder) {
      borderProps.border = [{ side: 'all', color: getBorderColor(props) }];
    }

    return css`
      flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};
      ${getStyles({ ...props, ...borderProps })};
    `;
  },
);

export const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const {
    componentProps: { children, ...rest },
    getDataAttributes,
  } = useList(props);

  return (
    <StyledList ref={ref} {...getDataAttributes('List')} {...rest}>
      {enhanceChildren(children, ListItem, {
        ...omit(rest, 'radius', 'shadow'),
        getDataAttributes,
      })}
    </StyledList>
  );
});

List.displayName = 'List';

export { defaultProps, type ListProps } from './useList';
