import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { Types } from '@gilbarbara/helpers';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { DatePickerRangeParameter } from '~/components/DatePicker/useDatePicker';

import {
  CheckboxItem,
  DropdownOption,
  InputTypes,
  RadioItem,
  WithAccent,
  WithBorderless,
  WithDisabled,
} from '~/types';
import type {
  DatePickerSelectorProps,
  DropdownProps,
  FormGroupProps,
  ToggleProps,
} from '~/types/props';

interface FieldExcludedProps {
  children?: never;
  datePickerProps?: never;
  dropdownProps?: never;
  formatter?: never;
  items?: never;
  onBlur?: never;
  onFocus?: never;
  toggleProps?: never;
  validationOptions?: never;
}

export type FieldCheckboxProps = Simplify<
  FieldBaseProps &
    Omit<FieldExcludedProps, 'items'> & {
      items: CheckboxItem[];
      onChange?: (value: Array<string>) => void;
      type: 'checkbox';
    }
>;

export type FieldDatePickerProps = Simplify<
  FieldBaseProps &
    Omit<FieldExcludedProps, 'datePickerProps'> & {
      datePickerProps?: Simplify<Omit<DatePickerSelectorProps, 'placeholder' | 'theme'>>;
      onChange?: (selection: DatePickerRangeParameter | string) => void;
      type: 'datePicker';
    }
>;

export type FieldDropdownProps = Simplify<
  FieldBaseProps &
    Omit<FieldExcludedProps, 'dropdownProps' | 'items'> & {
      dropdownProps?: Omit<
        DropdownProps,
        'disabled' | 'inputOptions' | 'items' | 'onChange' | 'placeholder' | 'width'
      >;
      items: DropdownOption[];
      onChange?: (value: StringOrNumber | Array<StringOrNumber>) => void;
      type: 'dropdown';
    }
>;

export type FieldInputProps = Simplify<
  FieldBaseProps &
    Omit<FieldExcludedProps, 'formatter' | 'onBlur' | 'onFocus'> &
    Omit<FieldInputHandlers<HTMLInputElement>, 'onChange'> & {
      formatter?: 'money' | 'number' | 'phoneBR' | 'phoneUS';
      onChange?: (value: string) => void;
      type: Exclude<InputTypes, 'password'>;
    }
>;

export type FieldPasswordProps = Simplify<
  FieldBaseProps &
    Omit<FieldExcludedProps, 'onBlur' | 'onFocus' | 'validationOptions'> &
    Omit<FieldInputHandlers<HTMLInputElement>, 'onChange'> & {
      onChange?: (value: string) => void;
      type: 'password';
      validationOptions?: Types.ValidatePasswordOptions;
    }
>;

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

export type FieldRadioProps = Simplify<
  FieldBaseProps &
    Omit<FieldExcludedProps, 'items'> & {
      items: RadioItem[];
      onChange?: (value: string) => void;
      type: 'radio';
    }
>;

export type FieldSelectProps = Simplify<
  FieldBaseProps &
    Omit<FieldExcludedProps, 'children' | 'onBlur' | 'onFocus'> &
    Omit<FieldInputHandlers<HTMLSelectElement>, 'onChange'> & {
      children: ReactNode[];
      onChange?: (value: string) => void;
      type: 'select';
    }
>;

export type FieldTextareaProps = Simplify<
  FieldBaseProps &
    Omit<FieldExcludedProps, 'onBlur' | 'onFocus'> &
    Omit<FieldInputHandlers<HTMLTextAreaElement>, 'onChange'> & {
      onChange?: (value: string) => void;
      rows?: number;
      type: 'textarea';
    }
>;

export type FieldToggleProps = Simplify<
  FieldBaseProps &
    Omit<FieldExcludedProps, 'toggleProps'> & {
      onChange?: (value: boolean) => void;
      toggleProps?: Omit<ToggleProps, 'disabled' | 'label' | 'name' | 'onChange'>;
      type: 'toggle';
    }
>;

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

export type RegisterOptionsProps = Simplify<
  FieldBaseProps & {
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
          validationOptions?: Types.ValidatePasswordOptions;
        }
    )
>;

export interface FieldBaseProps
  extends Pick<
      FormGroupProps,
      'assistiveText' | 'hideAssistiveText' | 'inline' | 'label' | 'required' | 'style'
    >,
    WithAccent,
    WithBorderless,
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

export interface FieldInputHandlers<
  T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
> {
  onBlur?: FocusEventHandler<T>;
  onChange?: ChangeEventHandler<T>;
  onFocus?: FocusEventHandler<T>;
}

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  debug: false,
  disabled: false,
  hideAssistiveText: false,
  inline: false,
  label: '',
  readOnly: false,
  required: false,
  skipValidation: false,
  type: 'text',
} satisfies Omit<FieldProps, 'name'>;

export function useField(props: FieldProps) {
  return useComponentProps(props, defaultProps);
}
