import {
  createContext,
  ReactElement,
  ReactNode,
  RefObject,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useDeepCompareEffect } from '@gilbarbara/hooks';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  Breakpoint,
  StyledProps,
  WithChildren,
  WithColors,
  WithFlexBox,
  WithMargin,
} from '~/types';

export interface NavBarKnownProps extends StyledProps, WithChildren, WithColors {
  /**
   * Add a blur effect to the navbar.
   * @default true
   */
  blurred?: boolean;
  /**
   * The opacity of the navbar when blurred (between 0 and 1).
   * It only works if `blurred` is set to `true`.
   * @default 0.2
   */
  blurredOpacity?: number;
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
   * The parent element where the navbar is placed within.
   * This is used to determine the scroll position and whether the navbar should be hidden or not.
   * @default `window`
   */
  parentRef?: RefObject<HTMLElement>;
  /**
   * The position of the navbar.
   * @default 'sticky'
   */
  position?: 'static' | 'sticky';
}

export type NavBarProps = Simplify<NavBarKnownProps>;

export interface NavBarContentProps extends StyledProps, WithChildren, WithFlexBox {
  /**
   * The breakpoint at which the content should be visible.
   * Use together with `hideBreakpoint` in NavBarToggle to show/hide the content at different breakpoints.
   */
  showBreakpoint?: Breakpoint;
}

export interface NavBarBrandProps extends StyledProps, WithChildren, WithFlexBox, WithMargin {}

export interface NavBarItemProps extends WithChildren {}

export interface NavBarMenuToggleProps {
  /**
   * The breakpoint at which the toggle button should be hidden.
   */
  hideBreakpoint?: Breakpoint;
  /**
   * The icon to be used for the toggle button.
   */
  icon?: ReactElement | ((isOpen: boolean) => ReactElement);
  /**
   * The text to be used by screen readers.
   * @default 'Toggle Menu'
   */
  srOnlyText?: string;
}

export interface NavBarMenuProps extends WithChildren, WithColors {
  /**
   * The container element in which the navbar menu overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: HTMLElement;
}

export interface NavBarMenuItemProps extends WithChildren {}

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

export const defaultProps = {
  blurred: true,
  blurredOpacity: 0.8,
  bordered: false,
  disableAnimation: false,
  disableScrollHandler: false,
  height: '64px',
  hideOnScroll: false,
  menuDefaultOpen: false,
  maxWidth: '100%',
  position: 'sticky',
} satisfies Omit<NavBarProps, 'children'>;

export const NavBarContext = createContext<NavBarContextValue | undefined>(undefined);
NavBarContext.displayName = 'NavBarContext';

export function NavBarProvider({ children, props, toggleMenu }: NavBarContextProps) {
  const [state, setState] = useState<ContextState>(props);

  useDeepCompareEffect(() => {
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

export function useNavBarContext(): NavBarContextValue {
  const context = useContext(NavBarContext);

  if (!context) {
    throw new Error('useNavBarContext must be used within a NavBarProvider');
  }

  return context;
}

export function useNavBar(props: NavBarProps) {
  return useComponentProps(props, defaultProps);
}
