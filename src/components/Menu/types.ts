import { ReactElement } from 'react';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import {
  OmitElementProps,
  PositionX,
  PositionY,
  StyledProps,
  WithAccent,
  WithChildren,
  WithDisabled,
  WithOpen,
} from '~/types';

export interface MenuKnownProps
  extends StyledProps,
    WithAccent,
    WithChildren,
    WithDisabled,
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

export type MenuProps = Simplify<OmitElementProps<HTMLDivElement, MenuKnownProps>>;
