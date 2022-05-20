import { ElementType, HTMLProps, ReactNode } from 'react';
import { SelectProps } from '@gilbarbara/react-dropdown';
import { StringOrNumber } from '@gilbarbara/types';
import { SetOptional } from 'type-fest';

import { WithBlock, WithBorderless, WithColor, WithMargin } from './shared';
import { Theme } from './theme';

export interface BaseProps {
  [hey: string]: any;
  theme?: Partial<Theme>;
}

export interface StyledProps {
  as?: ElementType;
  theme?: Theme;
}

export interface CheckboxOption extends Omit<Option, 'value'> {
  name: string;
}

export type ComponentProps<T, P, E extends string = never> = P &
  Omit<HTMLProps<T>, 'ref' | 'size' | keyof P | E>;

export interface DropdownItem {
  disabled?: boolean;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: string;
  value: StringOrNumber;
}

export type DropdownBaseProps<T extends DropdownItem = DropdownItem> = SetOptional<
  Omit<
    SelectProps<T>,
    | 'additionalProps'
    | 'addPlaceholder'
    | 'className'
    | 'clearOnBlur'
    | 'clearOnSelect'
    | 'clearRenderer'
    | 'closeOnSelect'
    | 'color'
    | 'contentRenderer'
    | 'create'
    | 'createNewLabel'
    | 'debounceDelay'
    | 'disabledLabel'
    | 'dropdownHandle'
    | 'dropdownHandleRenderer'
    | 'dropdownHeight'
    | 'dropdownRenderer'
    | 'handleKeyDownFn'
    | 'inputRenderer'
    | 'itemRenderer'
    | 'keepOpen'
    | 'labelField'
    | 'loadingRenderer'
    | 'name'
    | 'noDataRenderer'
    | 'onClearAll'
    | 'onCreateNew'
    | 'onDropdownCloseRequest'
    | 'onSelectAll'
    | 'optionRenderer'
    | 'options'
    | 'pattern'
    | 'portal'
    | 'required'
    | 'searchBy'
    | 'searchFn'
    | 'separatorRenderer'
    | 'sortBy'
    | 'style'
    | 'valueField'
    | 'wrapperClassName'
  >,
  'onChange' | 'values'
>;

export interface DropdownProps<T extends DropdownItem = DropdownItem>
  extends StyledProps,
    WithBorderless,
    WithColor,
    WithMargin,
    DropdownBaseProps<T> {
  /** @default false */
  allowCreate?: boolean;
  /**
   * The label for the Create component. "{search}" will be replaced by search value.
   * @default Add {search}
   */
  /** @default false */
  closeMultiOnSelect?: boolean;
  createLabel?: string;
  /** @default 260 */
  height?: StringOrNumber;
  /**
   * If set, an input with type hidden will be added to the component with the value of the selected option(s).
   * In case of multiple items, the value will be a string concatenated with "separator".
   */
  inputOptions?: {
    /**
     * The input name.
     */
    name: string;
    /**
     * The property used in the input value.
     * @default value
     */
    property?: 'label' | 'value';
    /**
     * Set the input to be required.
     */
    required?: boolean;
    /**
     * The character to separate multiple values.
     * @default ,
     */
    separator?: string;
  };
  items: T[];
  large?: boolean;
  onClear?: () => void;
  onCreate?: (value: string, close: () => void) => void;
  onSearch?: (value: string) => void;
  /**
   * Controlled status
   */
  open?: boolean;
  /** @default 260 */
  width?: StringOrNumber;
}

export interface LoaderProps
  extends ComponentProps<HTMLDivElement, StyledProps & WithBlock & WithColor> {
  color?: string;
  size?: number;
  /** @default pill */
  type?: 'pill' | 'grow' | 'pulse' | 'rotate';
}

export interface Option {
  disabled?: boolean;
  label: ReactNode;
  value: StringOrNumber;
}

export interface SearchCreateProps {
  close: () => void;
  value: string;
}

export interface SearchMessages {
  error?: ReactNode;
  loading?: ReactNode;
  noResults?: ReactNode;
}

export interface SearchOption {
  label?: ReactNode;
  value: string;
}

export type SearchOptionCallback =
  | ((value: string) => SearchOption[])
  | ((value: string) => Promise<SearchOption[]>);
export type SearchOptions = SearchOption[] | SearchOptionCallback;
