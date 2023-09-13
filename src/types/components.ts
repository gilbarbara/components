import { ElementType, HTMLProps, ReactNode } from 'react';
import { HiddenInput, Option, Props } from '@gilbarbara/react-dropdown';
import { StringOrNumber } from '@gilbarbara/types';

import { WithAccent, WithBorderless, WithDisabled, WithMargin, WithOpen } from './shared';
import { Theme, VariantWithTones } from './theme';

export interface BaseProps {
  [hey: string]: any;
  theme?: Partial<Theme>;
}

export interface StyledProps {
  as?: ElementType;
  theme?: Theme;
}

export interface CheckboxItem extends WithDisabled {
  label?: ReactNode;
  name: string;
}

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

export type OmitElementProps<TElement, TProps, TProperties extends string = never> = TProps &
  Omit<HTMLProps<TElement>, 'ref' | 'size' | keyof TProps | TProperties>;

export interface RadioItem extends WithDisabled {
  accent?: VariantWithTones;
  label?: ReactNode;
  value: StringOrNumber;
}
