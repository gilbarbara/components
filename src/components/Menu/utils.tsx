import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { SetRequired } from '@gilbarbara/types';

import { Icon } from '~/components/Icon';

import { MenuProps } from './types';

export const defaultProps = {
  accent: 'primary',
  button: <Icon name="more-vertical-o" size={24} title={null} />,
  disabled: false,
  disableCloseOnBlur: false,
  disableKeyboardNavigation: false,
  labels: {
    close: 'Close menu',
    name: 'Menu',
    open: 'Open menu',
  },
  minWidth: 200,
  position: 'bottom-right',
  trigger: 'click',
} satisfies Omit<MenuProps, 'children'>;

interface MenuContextProps {
  children: ReactNode;
  closeMenu: () => void;
  props: ContextState;
}

type ContextState = Omit<
  SetRequired<
    MenuProps,
    | 'accent'
    | 'button'
    | 'disabled'
    | 'disableKeyboardNavigation'
    | 'minWidth'
    | 'position'
    | 'trigger'
  >,
  'button' | 'children'
>;
interface MenuContextValue {
  closeMenu: () => void;
  state: ContextState;
}

export const MenuContext = createContext<MenuContextValue | undefined>(undefined);
MenuContext.displayName = 'MenuContext';

export function MenuProvider({ children, closeMenu, props }: MenuContextProps) {
  const [state] = useState<ContextState>(props);

  const value = useMemo(
    () => ({
      closeMenu,
      state,
    }),
    [closeMenu, state],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenuContext(): MenuContextValue {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }

  return context;
}
