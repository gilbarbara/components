import { ChangeEventHandler, CSSProperties, FocusEventHandler, ReactNode } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { GenericFunction } from '@gilbarbara/types';

import { CheckboxOption, DropdownOption, DropdownProps, InputTypes, Option } from '../types';

export interface RegisterOptionsProps extends FieldBaseProps {
  formatter?: FieldInputProps['formatter'];
  getValues: UseFormGetValues<FieldValues>;
}

export type FieldTypes =
  | InputTypes
  | 'checkbox'
  | 'dropdown'
  | 'radio'
  | 'select'
  | 'toggle'
  | 'textarea';

export type FieldValidations = 'email' | `equalsTo:${string}` | 'password' | 'phoneBR';

export interface FieldInputHandlers<
  T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
> {
  onBlur?: FocusEventHandler<T>;
  onChange?: ChangeEventHandler<T>;
  onFocus?: FocusEventHandler<T>;
}

export interface FieldBaseProps {
  assistiveText?: ReactNode;
  autoComplete?: string;
  clearError?: GenericFunction;
  debug?: boolean;
  disabled?: boolean;
  hideAssistiveText?: boolean;
  id?: string;
  label?: ReactNode;
  maxLength?: number;
  minLength?: number;
  name: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  setValueAs?: (value: any) => any;
  skipValidation?: boolean;
  style?: CSSProperties;
  type: FieldTypes;
  validations?: FieldValidations[];
  value?: any;
}

export interface FieldCheckboxProps extends FieldBaseProps, FieldInputHandlers<HTMLInputElement> {
  children?: never;
  dropdownProps?: never;
  options: CheckboxOption[];
  type: 'checkbox';
}

export interface FieldDropdownProps extends FieldBaseProps {
  children?: never;
  dropdownProps?: Omit<
    DropdownProps,
    'disabled' | 'name' | 'onChange' | 'options' | 'placeholder' | 'width'
  >;
  onBlur?: never;
  onChange?: (value: DropdownOption[]) => void;
  onFocus?: never;
  options: DropdownOption[];
  type: 'dropdown';
}

export interface FieldInputProps extends FieldBaseProps, FieldInputHandlers<HTMLInputElement> {
  children?: never;
  dropdownProps?: never;
  formatter?: 'money' | 'number' | 'phoneBR';
  options?: never;
  type: InputTypes;
}

export interface FieldRadioProps extends FieldBaseProps, FieldInputHandlers<HTMLInputElement> {
  children?: never;
  dropdownProps?: never;
  options: Option[];
  type: 'radio';
}

export interface FieldSelectProps extends FieldBaseProps, FieldInputHandlers<HTMLSelectElement> {
  children: ReactNode[];
  dropdownProps?: never;
  options?: never;
  type: 'select';
}

export interface FieldTextareaProps
  extends FieldBaseProps,
    FieldInputHandlers<HTMLTextAreaElement> {
  children?: never;
  dropdownProps?: never;
  options?: never;
  type: 'textarea';
}

export interface FieldToggleProps extends FieldBaseProps {
  children?: never;
  dropdownProps?: never;
  onBlur?: never;
  onChange?: (value: boolean) => void;
  onFocus?: never;
  options?: never;
  type: 'toggle';
}

export type FieldProps =
  | FieldCheckboxProps
  | FieldDropdownProps
  | FieldInputProps
  | FieldRadioProps
  | FieldSelectProps
  | FieldTextareaProps
  | FieldToggleProps;
