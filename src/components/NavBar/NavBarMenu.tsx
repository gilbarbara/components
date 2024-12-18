import { useComponentProps } from '~/hooks/useComponentProps';

import { Sidebar } from '~/components/Sidebar';

import { NavBarMenuProps, useNavBarContext } from './useNavBar';

export function NavBarMenu(props: NavBarMenuProps) {
  const { componentProps, getDataAttributes } = useComponentProps(props);
  const { onClose, onDismiss, onOpen, ...rest } = componentProps;

  const {
    state: { disableAnimation, height, isMenuOpen, placement },
    toggleMenu,
  } = useNavBarContext();

  const handleDismiss = () => {
    toggleMenu(false);
  };

  return (
    <Sidebar
      {...getDataAttributes('NavBarMenu')}
      {...rest}
      animationExitDuration={0.3}
      bottom={placement === 'bottom' ? height : 0}
      disableAnimation={disableAnimation}
      isOpen={isMenuOpen}
      onDismiss={handleDismiss}
      top={placement === 'top' ? height : 0}
    />
  );
}

NavBarMenu.displayName = 'NavBarMenu';
