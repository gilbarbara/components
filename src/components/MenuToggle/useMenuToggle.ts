import { useComponentProps } from '~/hooks/useComponentProps';

import { Breakpoint, ColorVariantTones, WithPositioning } from '~/types';

export interface MenuToggleProps extends WithPositioning {
  /**
   * The border width of the bars.
   * @default 2
   */
  border?: number;
  /**
   * The color of the bars.
   */
  color?: ColorVariantTones;
  /**
   * The breakpoint at which the toggle button should be hidden.
   */
  hideBreakpoint?: Breakpoint;
  /**
   * The state of the toggle button.
   * @default false
   */
  isOpen: boolean;
  onToggle?: (isOpen: boolean) => void;
  /**
   * The radius of the bars.
   */
  radius?: number;
  /**
   * The size of the icon.
   * @default 16
   */
  size?: number;
  /**
   * The text to be used by screen readers.
   * @default 'Toggle Menu'
   */
  srOnlyText?: string;
}

export const defaultProps = {
  border: 2,
  isOpen: false,
  size: 16,
  srOnlyText: 'Toggle Menu',
} satisfies Omit<MenuToggleProps, 'onToggle'>;

export function useMenuToggle(props: MenuToggleProps) {
  return useComponentProps(props, defaultProps);
}
