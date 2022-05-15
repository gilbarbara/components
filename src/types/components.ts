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

export interface DropdownCreateProps<T extends DropdownOption = DropdownOption> {
  close: () => void;
  select: (item: T) => void;
  value: StringOrNumber;
}

export interface DropdownOption {
  content?: ReactNode;
  disabled?: boolean;
  label: string;
  type?: string;
  value: StringOrNumber;
}

export interface DropdownProps<T extends DropdownOption = DropdownOption>
  extends StyledProps,
    WithBorderless,
    WithMargin,
    SetOptional<SelectProps<T>, 'onChange' | 'values'> {
  createFn?: (props: DropdownCreateProps<T>) => JSX.Element;
  large?: boolean;
  showCreateAlways?: boolean;
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
