import { useComponentProps } from '~/hooks/useComponentProps';

import { NavBarMenuItemProps } from './useNavBar';

export function NavBarMenuItem(props: NavBarMenuItemProps) {
  const {
    componentProps: { children },
    getDataAttributes,
  } = useComponentProps(props);

  return <li {...getDataAttributes('NavBarMenuItem')}>{children}</li>;
}

NavBarMenuItem.displayName = 'NavBarMenuItem';
