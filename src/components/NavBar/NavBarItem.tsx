import styled from '@emotion/styled';

import { useComponentProps } from '~/hooks/useComponentProps';

import { getStyledOptions } from '~/modules/system';

import { NavBarItemProps, NavBarMenuItemProps } from './useNavBar';

const StyledNavBarItem = styled('div', getStyledOptions())<NavBarMenuItemProps>`
  align-items: center;
  display: flex;
`;

export function NavBarItem(props: NavBarItemProps) {
  const { componentProps, getDataAttributes } = useComponentProps(props);
  const { children } = componentProps;

  return <StyledNavBarItem {...getDataAttributes('NavBarItem')}>{children}</StyledNavBarItem>;
}

NavBarItem.displayName = 'NavBarItem';
