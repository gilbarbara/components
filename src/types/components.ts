import { ElementType, HTMLProps, ReactNode } from 'react';
import { HiddenInput, Option, Props } from '@gilbarbara/react-dropdown';
import { StringOrNumber } from '@gilbarbara/types';

import {
  WithAccent,
  WithBlock,
  WithBorderless,
  WithColorsDefaultColor,
  WithMargin,
  WithOpen,
} from './shared';
import { Theme, VariantWithTones } from './theme';

export interface BaseProps {
  [hey: string]: any;
  theme?: Partial<Theme>;
}

export interface StyledProps {
  as?: ElementType;
  theme?: Theme;
}

export interface CheckboxItem {
  disabled?: boolean;
  label?: ReactNode;
  name: string;
}

export type ComponentProps<T, P, E extends string = never> = P &
  Omit<HTMLProps<T>, 'ref' | 'size' | keyof P | E>;

export interface DropdownOption extends Option {
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: string;
}

export type DropdownBaseProps = Omit<
  Props,
  | 'className'
  | 'clearComponent'
  | 'clearOnSelect'
  | 'contentComponent'
  | 'create'
  | 'handleComponent'
  | 'inputComponent'
  | 'loadingComponent'
  | 'menuComponent'
  | 'menuItemComponent'
  | 'noDataComponent'
  | 'onClearAll'
  | 'onCreate'
  | 'onSelectAll'
  | 'optionComponent'
  | 'options'
  | 'searchFn'
  | 'secondaryPlaceholder'
  | 'separatorComponent'
  | 'style'
  | 'styles'
>;

export interface DropdownProps
  extends StyledProps,
    WithAccent,
    WithBorderless,
    WithMargin,
    WithOpen,
    DropdownBaseProps {
  /** @default false */
  allowCreate?: boolean;
  /** @default false */
  closeMultiOnSelect?: boolean;
  /**
   * If set, an input with type hidden will be added to the component with the value of the selected option(s).
   * In case of multiple items, the value will be a string concatenated with "separator".
   */
  inputOptions?: HiddenInput;
  items: Option[];
  large?: boolean;
  /** @default 260 */
  menuMaxHeight?: number;
  onClear?: () => void;
  onCreate?: (item: string, close: () => void) => void;
  onSearch?: (value: string) => void;
  /** @default 260 */
  width?: StringOrNumber;
}

export interface LoaderProps
  extends ComponentProps<
    HTMLDivElement,
    StyledProps & WithBlock & Pick<WithColorsDefaultColor, 'color'>
  > {
  size?: number;
  /** @default pill */
  type?: 'grow' | 'pill' | 'pride' | 'pulse' | 'rotate';
}

export interface RadioItem {
  accent?: VariantWithTones;
  disabled?: boolean;
  label?: ReactNode;
  value: StringOrNumber;
}
