import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { GenericFunction } from '@gilbarbara/types';

import { FormGroupProps } from '../FormGroup';
import { CheckboxOption, DropdownItem, DropdownProps, InputTypes, Option } from '../types';

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

export interface FieldBaseProps
  extends Pick<
    FormGroupProps,
    'assistiveText' | 'hideAssistiveText' | 'inline' | 'label' | 'required' | 'style'
  > {
  autoComplete?: string;
  clearError?: GenericFunction;
  debug?: boolean;
  disabled?: boolean;
  id?: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  placeholder?: string;
  readOnly?: boolean;
  setValueAs?: (value: any) => any;
  skipValidation?: boolean;
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
    'disabled' | 'items' | 'name' | 'onChange' | 'placeholder' | 'width'
  >;
  items: DropdownItem[];
  onBlur?: never;
  onChange?: (value: DropdownItem[]) => void;
  onFocus?: never;
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
  rows?: number;
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
