import {
  createContext,
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useDeepCompareEffect } from '@gilbarbara/hooks';
import { PlainObject, SetRequired, Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { Icon } from '~/components/Icon';

import {
  PositionX,
  PositionY,
  StyledProps,
  WithAccent,
  WithChildren,
  WithColors,
  WithDisabled,
  WithHTMLAttributes,
  WithMargin,
  WithOpen,
  WithPadding,
  WithTextOptions,
  WithTextSize,
} from '~/types';

export interface MenuKnownProps
  extends StyledProps,
    WithAccent,
    Pick<WithColors, 'bg'>,
    WithChildren,
    WithDisabled,
    WithHTMLAttributes,
    WithOpen {
  /**
   * The Menu button.
   * @default An Icon with more-vertical-o
   */
  button?: ReactElement | ((isOpen: boolean) => ReactElement);
  /**
   * Disable closing the menu when you click outside.
   * @default false
   */
  disableCloseOnBlur?: boolean;
  /** @default false */
  disableKeyboardNavigation?: boolean;
  labels?: {
    /** @default Close menu */
    close?: string;
    /**
     * Override the open/close button aria-label.
     */
    name?: string;
    /** @default Open menu */
    open?: string;
  };
  /** @default 200 */
  minWidth?: StringOrNumber;
  onToggle?: (status: boolean) => void;
  /**
   * The orientation of the menu.
   * @default vertical
   */
  orientation?: 'vertical' | 'horizontal';
  /** @default bottom-right */
  position?: PositionX | PositionY;
  /** @default click */
  trigger?: 'click' | 'hover';
}

export type MenuProps = Simplify<MenuKnownProps>;

export interface MenuItemsProps
  extends Required<Pick<MenuProps, 'minWidth' | 'orientation' | 'position'>>,
    Pick<WithColors, 'bg'> {
  children: ReactNode;
  id: string;
  isOpen: boolean;
}

export interface MenuItemProps extends WithAccent, WithColors, WithDisabled, WithPadding {
  children: ((props: { closeMenu: () => void }) => ReactNode) | ReactNode;
  /**
   * Prevents the menu from closing when the item is clicked
   * @default false
   */
  disableAutoClose?: boolean;
  /**
   * Remove styling on hover.
   * @default false
   */
  disableHover?: boolean;
  onToggle?: (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    closeMenu: () => void,
  ) => void;
  /**
   * Allows the item to wrap its content
   * @default false
   */
  wrap?: boolean;
}

export interface MenuTitleProps extends WithColors, WithTextOptions, WithTextSize {
  children: ReactNode;
  style?: CSSProperties;
}

export interface MenuSeparatorProps extends WithMargin {}

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
  orientation: 'vertical',
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
  const [state, setState] = useState<ContextState>(props);

  useDeepCompareEffect(() => {
    setState(props);
  }, [props]);

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

export function useMenu<T extends PlainObject<any> = MenuProps>(props: T) {
  return useComponentProps(props, defaultProps);
}
