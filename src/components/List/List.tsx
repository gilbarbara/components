import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, omit } from '@gilbarbara/helpers';

import { useTheme } from '~/hooks/useTheme';

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

import { WithBorder } from '~/types';

import { ListItem } from './Item';
import { getBorderColor, ListProps } from './utils';

export const defaultProps = {
  direction: 'vertical',
  hideBorder: false,
  hideDivider: false,
  radius: 'xs',
  shadow: false,
  size: 'md',
} satisfies Omit<ListProps, 'children'>;

export const StyledList = styled(
  'ul',
  getStyledOptions(),
)<ListProps>(props => {
  const { direction, hideBorder } = props;

  const borderProps: WithBorder = {};

  if (!hideBorder) {
    borderProps.border = [{ side: 'all', color: getBorderColor(props) }];
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
  const { children, ...rest } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();

  return (
    <StyledList ref={ref} {...getDataAttributes('List')} {...rest}>
      {recursiveChildrenEnhancer(children, omit(rest, 'radius', 'shadow'), {
        componentType: ListItem,
        overrideProps: false,
      })}
    </StyledList>
  );
});

List.displayName = 'List';
