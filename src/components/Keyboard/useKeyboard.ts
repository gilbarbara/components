import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import {
  StyledProps,
  WithBorder,
  WithChildrenOptional,
  WithColors,
  WithFlexBox,
  WithHTMLAttributes,
  WithRadius,
  WithShadow,
  WithTextOptions,
} from '~/types';

export interface KeyboardKnownProps
  extends StyledProps,
    WithBorder,
    WithChildrenOptional,
    WithColors,
    Pick<WithFlexBox, 'gap'>,
    WithHTMLAttributes<HTMLSpanElement>,
    WithRadius,
    WithShadow,
    WithTextOptions {
  /**
   * The key or keys to be displayed.
   */
  keys: KeyboardKey | KeyboardKey[];
  /**
   * The separator between keys.
   */
  separator?: string;
  /**
   *  Don't show symbols.
   *  @default false
   */
  textOnly?: boolean;
}

export type KeyboardProps = Simplify<KeyboardKnownProps>;

export type KeyboardKey =
  | 'command'
  | 'option'
  | 'alt'
  | 'control'
  | 'ctrl'
  | 'shift'
  | 'enter'
  | 'delete'
  | 'escape'
  | 'tab'
  | 'capslock'
  | 'up'
  | 'right'
  | 'down'
  | 'left'
  | 'pageup'
  | 'pagedown'
  | 'home'
  | 'end'
  | 'help'
  | 'space';

export type KeyboardKeysLabelType = typeof keyboardKeysLabelMap;

export const keyboardKeysMap: Record<KeyboardKey, string> = {
  command: '⌘',
  option: '⌥',
  alt: '⌥',
  control: '⌃',
  ctrl: '⌃',
  shift: '⇧',
  enter: '↵',
  delete: '⌫',
  escape: '⎋',
  tab: '⇥',
  capslock: '⇪',
  up: '↑',
  right: '→',
  down: '↓',
  left: '←',
  pageup: '⇞',
  pagedown: '⇟',
  home: '↖',
  end: '↘',
  help: '?',
  space: '␣',
};

export const keyboardKeysLabelMap: Record<KeyboardKey, string> = {
  command: 'Command',
  option: 'Option',
  alt: 'Alt',
  control: 'Control',
  ctrl: 'Control',
  shift: 'Shift',
  enter: 'Enter',
  delete: 'Delete',
  escape: 'Escape',
  tab: 'Tab',
  capslock: 'Caps Lock',
  up: 'Up',
  right: 'Right',
  down: 'Down',
  left: 'Left',
  pageup: 'Page Up',
  pagedown: 'Page Down',
  home: 'Home',
  end: 'End',
  help: 'Help',
  space: 'Space',
};

export const defaultProps = {
  bg: 'gray.100',
  border: { color: 'gray.200' },
  color: 'gray.600',
  gap: 'xxxs',
  radius: 'xs',
  shadow: 'low',
  size: 'md',
  textOnly: false,
} satisfies Omit<KeyboardProps, 'keys'>;

export function useKeyboard(props: KeyboardProps) {
  return useComponentProps(props, defaultProps);
}
