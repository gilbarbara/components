import { MouseEventHandler } from 'react';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { MenuProps } from '~/components/Menu/useMenu';

import {
  DataAttributes,
  PositionY,
  WithBlock,
  WithBusy,
  WithButtonSize,
  WithChildren,
  WithColorsDefaultBg,
  WithLabel,
  WithTextOptions,
} from '~/types';

export type ButtonSplitProps = Simplify<ButtonSplitKnownProps>;

export interface ButtonSplitKnownProps
  extends Pick<MenuProps, 'disabled' | 'onToggle'>,
    WithBlock,
    WithButtonSize,
    WithBusy,
    WithChildren,
    WithColorsDefaultBg,
    Required<WithLabel> {
  /**
   * Whether the button should only have a border
   * @default false
   */
  bordered?: boolean;
  buttonProps?: WithTextOptions & DataAttributes;
  onClick: MouseEventHandler<HTMLButtonElement>;
  /** @default bottom-right */
  position?: PositionY;
}

export const defaultProps = {
  bg: 'primary',
  block: false,
  bordered: false,
  busy: false,
  disabled: false,
  position: 'bottom-right',
  size: 'md',
} satisfies Omit<ButtonSplitProps, 'children' | 'label' | 'onClick'>;

export function useButtonSplit(props: ButtonSplitProps) {
  return useComponentProps(props, defaultProps);
}
