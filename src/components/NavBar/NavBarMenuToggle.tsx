import { useComponentProps } from '~/hooks/useComponentProps';

import { MenuToggle } from '~/components/MenuToggle';
import { MenuToggleProps } from '~/components/MenuToggle/useMenuToggle';

import { useNavBarContext } from './useNavBar';

export function NavBarMenuToggle(props: Omit<MenuToggleProps, 'isOpen'>) {
  const { componentProps, getDataAttributes } = useComponentProps(props);
  const {
    state: { isMenuOpen },
    toggleMenu,
  } = useNavBarContext();

  return (
    <MenuToggle
      {...componentProps}
      {...getDataAttributes('NavBarMenuToggle')}
      isOpen={isMenuOpen}
      onToggle={toggleMenu}
    />
  );
}

NavBarMenuToggle.displayName = 'NavBarMenuToggle';
