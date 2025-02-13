import { createContext, ReactNode, RefObject, useContext, useMemo, useState } from 'react';
import { useEffectDeepCompare } from '@gilbarbara/hooks';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { SidebarProps } from '~/components/Sidebar/useSidebar';

import {
  Breakpoint,
  StyledProps,
  WithBorder,
  WithChildren,
  WithColors,
  WithDimension,
  WithFlexBox,
  WithPadding,
} from '~/types';

type ContextState = SetRequired<Omit<NavBarProps, 'children'>, keyof typeof defaultProps> & {
  isMenuOpen: boolean;
};

interface NavBarContextProps {
  children: ReactNode;
  props: ContextState;
  toggleMenu: (isOpen: boolean) => void;
}

interface NavBarContextValue extends Pick<NavBarContextProps, 'toggleMenu'> {
  state: ContextState;
}

export type NavBarProps = Simplify<NavBarKnownProps>;

export interface NavBarContentProps extends StyledProps, WithChildren, WithDimension, WithFlexBox {
  /**
   * The breakpoint at which the content should be hidden.
   */
  hideBreakpoint?: Breakpoint;
  /**
   * The breakpoint at which the content should be visible.
   */
  showBreakpoint?: Breakpoint;
}

export interface NavBarKnownProps extends StyledProps, WithChildren, WithColors {
  /**
   * Add a blur effect to the navbar.
   * @default true
   */
  blurred?: boolean;
  /**
   * The radius of the blur effect.
   * @default 8
   */
  blurredRadius?: number;
  /**
   * Show a border at the bottom of the navbar.
   * @default false
   */
  bordered?: boolean;
  /**
   * Disable the navbar animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Disable the navbar parent scroll event listener.
   * @default false
   */
  disableScrollHandler?: boolean;
  /**
   * The height of the navbar.
   * @default 64px
   */
  height?: number | string;
  /**
   * Hide the navbar on scroll.
   * @default false
   */
  hideOnScroll?: boolean;
  /**
   * The maximum width of the navbar.
   */
  maxWidth?: number | string;
  /**
   * Should open the menu by default.
   * @default false
   */
  menuDefaultOpen?: boolean;
  /**
   * Control the menu open state.
   */
  menuOpen?: boolean;
  /**
   * The scroll event handler for the navbar. The event fires when the navbar parent element is scrolled.
   * It only works if `disableScrollHandler` is set to `false` or `hideOnScroll` is set to `true`.
   */
  onScrollPosition?: (scrollPosition: number) => void;
  /**
   * The event handler for the menu state.
   */
  onToggleMenu?: (isOpen: boolean) => void;
  /**
   * The opacity of the navbar (between 0 and 1).
   * @default 0.8
   */
  opacity?: number;
  /**
   * The parent element where the navbar is placed within.
   * This is used to determine the scroll position and whether the navbar should be hidden or not.
   * @default `window`
   */
  parentRef?: RefObject<HTMLElement>;
  /**
   * The placement of the navbar.
   * @default 'top'
   */
  placement?: 'top' | 'bottom';
  /**
   * The position of the navbar.
   * @default 'sticky'
   */
  position?: 'static' | 'sticky';
  /**
   * The z-index of the navbar.
   * @default 200
   */
  zIndex?: number;
}

export interface NavBarMenuProps
  extends WithBorder,
    WithChildren,
    WithColors,
    WithDimension,
    WithPadding,
    Omit<SidebarProps, 'disableAnimation' | 'isOpen' | 'onDismiss'> {}

export const defaultProps = {
  blurred: true,
  blurredRadius: 8,
  bordered: false,
  disableAnimation: false,
  disableScrollHandler: false,
  height: '64px',
  hideOnScroll: false,
  menuDefaultOpen: false,
  maxWidth: '100%',
  opacity: 0.8,
  placement: 'top',
  position: 'sticky',
  zIndex: 200,
} satisfies Omit<NavBarProps, 'children'>;

export const NavBarContext = createContext<NavBarContextValue | undefined>(undefined);
NavBarContext.displayName = 'NavBarContext';

export function NavBarProvider({ children, props, toggleMenu }: NavBarContextProps) {
  const [state, setState] = useState<ContextState>(props);

  useEffectDeepCompare(() => {
    setState(props);
  }, [props]);

  const value = useMemo(
    () => ({
      state,
      toggleMenu,
    }),
    [state, toggleMenu],
  );

  return <NavBarContext.Provider value={value}>{children}</NavBarContext.Provider>;
}

export function useNavBar(props: NavBarProps) {
  return useComponentProps(props, defaultProps);
}

export function useNavBarContext(): NavBarContextValue {
  const context = useContext(NavBarContext);

  if (!context) {
    throw new Error('useNavBarContext must be used within a NavBarProvider');
  }

  return context;
}
