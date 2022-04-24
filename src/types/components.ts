import * as React from 'react';
import { DayPickerProps } from 'react-day-picker';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { SelectProps } from '@gilbarbara/react-dropdown';
import { StringOrNumber } from '@gilbarbara/types';
import { SetOptional } from 'type-fest';

import { WithColor, WithMargin } from './shared';
import { ColorVariants, Theme } from './theme';

export interface BaseProps {
  [hey: string]: any;
  theme?: Partial<Theme>;
}

export interface StyledProps {
  as?: React.ElementType;
  theme?: Theme;
}

export interface CheckboxOption extends Omit<Option, 'value'> {
  name: string;
}

export type ComponentProps<T, P, E extends string = never> = P &
  Omit<React.HTMLProps<T>, 'size' | 'ref' | keyof P | E>;

export type DatePickerRangeParameter = [string | undefined, string | undefined];

export type DatePickerClickHandler = (isoString: string | DatePickerRangeParameter) => void;
export type DatePickerRangeClickHandler = (isoString: DatePickerRangeParameter) => void;
export type DatePickerSingleClickHandler = (isoString: string) => void;

export interface DatePickerProps<T = DatePickerSingleClickHandler>
  extends StyledProps,
    DayPickerProps {
  finalDate?: string | Date;
  initialDate?: string | Date;
  /** @default en */
  locale?: 'en' | 'pt';
  onClick?: T;
  /** @default primary */
  variant?: ColorVariants;
}

export interface DropdownCreateProps<T extends DropdownOption = DropdownOption> {
  close: () => void;
  select: (item: T) => void;
  value: string | number;
}

export interface DropdownOption {
  content?: React.ReactNode;
  disabled?: boolean;
  label: string | number;
  type?: string;
  value: string | number;
}

export interface DropdownProps<T extends DropdownOption>
  extends StyledProps,
    WithMargin,
    SetOptional<SelectProps<T>, 'onChange' | 'values'> {
  bigger?: boolean;
  borderless?: boolean;
  createFn?: (props: DropdownCreateProps<T>) => JSX.Element;
  showCreateAlways?: boolean;
  /** @default 260 */
  width?: StringOrNumber;
}

export interface FormWrapperProps<T = FieldValues> {
  formMethods: UseFormReturn<T>;
}

export interface IconProps extends Omit<React.SVGProps<SVGElement>, 'ref'> {
  color?: string;
  size?: number;
  title?: string;
}

export interface LoaderProps extends ComponentProps<HTMLDivElement, StyledProps & WithColor> {
  block?: boolean;
  color?: string;
  size?: number;
  /** @default pill */
  type?: 'pill' | 'grow' | 'pulse' | 'rotate';
}

export interface Option {
  disabled?: boolean;
  label: React.ReactNode;
  value: number | string;
}

export interface SearchCreateProps {
  close: () => void;
  value: string;
}

export interface SearchMessages {
  error?: React.ReactNode;
  loading?: React.ReactNode;
  noResults?: React.ReactNode;
}

export interface SearchOption {
  label?: React.ReactNode;
  value: string;
}

export type SearchOptionCallback =
  | ((value: string) => SearchOption[])
  | ((value: string) => Promise<SearchOption[]>);
export type SearchOptions = SearchOption[] | SearchOptionCallback;
