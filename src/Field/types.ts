import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

import { FormGroupProps } from '../FormGroup';
import { CheckboxItem, DropdownOption, DropdownProps, InputTypes, RadioItem } from '../types';

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
  clearError?: () => void;
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
  items: CheckboxItem[];
  type: 'checkbox';
}

export interface FieldDropdownProps extends FieldBaseProps {
  children?: never;
  dropdownProps?: Omit<
    DropdownProps,
    'disabled' | 'inputOptions' | 'items' | 'onChange' | 'placeholder' | 'width'
  >;
  items: DropdownOption[];
  onBlur?: never;
  onChange?: (value: DropdownOption[]) => void;
  onFocus?: never;
  type: 'dropdown';
}

export interface FieldInputProps extends FieldBaseProps, FieldInputHandlers<HTMLInputElement> {
  children?: never;
  dropdownProps?: never;
  formatter?: 'money' | 'number' | 'phoneBR';
  items?: never;
  type: InputTypes;
}

export interface FieldRadioProps extends FieldBaseProps, FieldInputHandlers<HTMLInputElement> {
  children?: never;
  dropdownProps?: never;
  items: RadioItem[];
  type: 'radio';
}

export interface FieldSelectProps extends FieldBaseProps, FieldInputHandlers<HTMLSelectElement> {
  children: ReactNode[];
  dropdownProps?: never;
  items?: never;
  type: 'select';
}

export interface FieldTextareaProps
  extends FieldBaseProps,
    FieldInputHandlers<HTMLTextAreaElement> {
  children?: never;
  dropdownProps?: never;
  items?: never;
  rows?: number;
  type: 'textarea';
}

export interface FieldToggleProps extends FieldBaseProps {
  children?: never;
  dropdownProps?: never;
  items?: never;
  onBlur?: never;
  onChange?: (value: boolean) => void;
  onFocus?: never;
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
