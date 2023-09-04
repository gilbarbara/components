import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { DatePickerSelectorProps } from '~/components/DatePicker';
import { DatePickerRangeParameter } from '~/components/DatePicker/types';
import { FormGroupProps } from '~/components/FormGroup/FormGroup';

import {
  CheckboxItem,
  DropdownOption,
  DropdownProps,
  InputTypes,
  RadioItem,
  ValidatePasswordOptions,
  WithAccent,
  WithDisabled,
} from '~/types';

export type RegisterOptionsProps = FieldBaseProps & {
  getValues: UseFormGetValues<FieldValues>;
} & (
    | {
        formatter?: FieldInputProps['formatter'];
        type: Exclude<FieldTypes, 'password'>;
        validationOptions?: never;
      }
    | {
        formatter?: never;
        type: 'password';
        validationOptions?: ValidatePasswordOptions;
      }
  );

export type FieldTypes =
  | InputTypes
  | 'checkbox'
  | 'datePicker'
  | 'dropdown'
  | 'radio'
  | 'select'
  | 'toggle'
  | 'textarea';

export type FieldValidations = 'email' | `equalsTo:${string}` | 'password' | 'phoneBR' | 'phoneUS';

export interface FieldInputHandlers<
  T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
> {
  onBlur?: FocusEventHandler<T>;
  onChange?: ChangeEventHandler<T>;
  onFocus?: FocusEventHandler<T>;
}

interface FieldExcludedProps {
  children?: never;
  datePickerProps?: never;
  dropdownProps?: never;
  formatter?: never;
  items?: never;
  onBlur?: never;
  onFocus?: never;
  validationOptions?: never;
}

export interface FieldBaseProps
  extends Pick<
      FormGroupProps,
      'assistiveText' | 'hideAssistiveText' | 'inline' | 'label' | 'required' | 'style'
    >,
    WithAccent,
    WithDisabled {
  autoComplete?: string;
  clearError?: () => void;
  debug?: boolean;
  id?: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  placeholder?: string;
  readOnly?: boolean;
  setValueAs?: (value: any) => any;
  skipValidation?: boolean;
  validations?: FieldValidations[];
  value?: any;
}

export interface FieldCheckboxProps extends FieldBaseProps, Omit<FieldExcludedProps, 'items'> {
  items: CheckboxItem[];
  onChange?: (value: Array<string>) => void;
  type: 'checkbox';
}

export interface FieldDatePickerProps
  extends FieldBaseProps,
    Omit<FieldExcludedProps, 'datePickerProps'> {
  datePickerProps?: Simplify<Omit<DatePickerSelectorProps, 'placeholder'>>;
  onChange?: (selection: DatePickerRangeParameter | string) => void;
  type: 'datePicker';
}

export interface FieldDropdownProps
  extends FieldBaseProps,
    Omit<FieldExcludedProps, 'dropdownProps' | 'items'> {
  dropdownProps?: Omit<
    DropdownProps,
    'disabled' | 'inputOptions' | 'items' | 'onChange' | 'placeholder' | 'width'
  >;
  items: DropdownOption[];
  onChange?: (value: StringOrNumber | Array<StringOrNumber>) => void;
  type: 'dropdown';
}

export interface FieldInputProps
  extends FieldBaseProps,
    Omit<FieldExcludedProps, 'formatter' | 'onBlur' | 'onFocus'>,
    Omit<FieldInputHandlers<HTMLInputElement>, 'onChange'> {
  formatter?: 'money' | 'number' | 'phoneBR' | 'phoneUS';
  onChange?: (value: string) => void;
  type: Exclude<InputTypes, 'password'>;
}

export interface FieldPasswordProps
  extends FieldBaseProps,
    Omit<FieldExcludedProps, 'onBlur' | 'onFocus' | 'validationOptions'>,
    Omit<FieldInputHandlers<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void;
  type: 'password';
  validationOptions?: ValidatePasswordOptions;
}

export interface FieldRadioProps extends FieldBaseProps, Omit<FieldExcludedProps, 'items'> {
  items: RadioItem[];
  onChange?: (value: string) => void;
  type: 'radio';
}

export interface FieldSelectProps
  extends FieldBaseProps,
    Omit<FieldExcludedProps, 'children' | 'onBlur' | 'onFocus'>,
    Omit<FieldInputHandlers<HTMLSelectElement>, 'onChange'> {
  children: ReactNode[];
  onChange?: (value: string) => void;
  type: 'select';
}

export interface FieldTextareaProps
  extends FieldBaseProps,
    Omit<FieldExcludedProps, 'onBlur' | 'onFocus'>,
    Omit<FieldInputHandlers<HTMLTextAreaElement>, 'onChange'> {
  onChange?: (value: string) => void;
  rows?: number;
  type: 'textarea';
}

export interface FieldToggleProps extends FieldBaseProps, FieldExcludedProps {
  onChange?: (value: boolean) => void;
  type: 'toggle';
}

export type FieldProps =
  | FieldCheckboxProps
  | FieldDatePickerProps
  | FieldDropdownProps
  | FieldInputProps
  | FieldPasswordProps
  | FieldRadioProps
  | FieldSelectProps
  | FieldTextareaProps
  | FieldToggleProps;
