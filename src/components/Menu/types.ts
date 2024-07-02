import { CSSProperties, KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

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
    WithChildren,
    WithDisabled,
    WithHTMLAttributes,
    WithOpen {
  /**
   * The Menu button.
   * @default An Icon with more-vertical-o
   */
  button?: ReactElement;
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
  /** @default bottom-right */
  position?: PositionX | PositionY;
  /** @default click */
  trigger?: 'click' | 'hover';
}

export type MenuProps = Simplify<MenuKnownProps>;

export interface MenuItemProps extends WithColors, WithDisabled, WithPadding {
  children: ((props: { closeMenu: () => void }) => ReactNode) | ReactNode;
  /**
   * Prevents the menu from closing when the item is clicked
   * @default false
   */
  disableAutoClose?: boolean;
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
