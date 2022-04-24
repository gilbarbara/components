import * as React from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { AnyObject, GenericFunction } from '@gilbarbara/types';

import { InputTypes } from './common';
import { DropdownOption, DropdownProps, Option } from './components';

export interface RegisterOptionsProps extends BaseProps {
  getValues: UseFormGetValues<FieldValues>;
}

export type FieldTypes =
  | 'checkbox'
  | 'dropdown'
  | 'radio'
  | 'select'
  | 'toggle'
  | 'textarea'
  | InputTypes;

export type FieldValidations = 'email' | `equalsTo:${string}` | 'password' | 'phoneBR';

interface BaseProps {
  assistiveText?: React.ReactNode;
  autoComplete?: string;
  borderless?: boolean;
  children?: any;
  clearError?: GenericFunction;
  dataset?: AnyObject;
  debug?: boolean;
  disabled?: boolean;
  dropdownOptions?: any;
  filter?: any[];
  formatter?: 'moneyBR' | 'number' | 'phoneBR';
  hideAssistiveText?: boolean;
  id?: string;
  label?: React.ReactNode;
  maxLength?: number;
  minLength?: number;
  multiple?: boolean;
  name: string;
  onBlur?: any;
  onChange?: any;
  onFocus?: any;
  options?: any;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  setError?: GenericFunction;
  setValueAs?: (value: string) => any;
  skipValidation?: boolean;
  style?: React.CSSProperties;
  type?: FieldTypes;
  validations?: FieldValidations[];
  value?: any;
}

export type FieldProps = BaseProps &
  (
    | {
        onBlur?: React.FocusEventHandler<HTMLInputElement>;
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        onFocus?: React.FocusEventHandler<HTMLInputElement>;
        type: InputTypes | 'checkbox';
      }
    | {
        dropdownOptions: DropdownProps<DropdownOption>;
        onChange?: (value: DropdownOption[]) => void;
        type: 'dropdown';
      }
    | {
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        options: Option[];
        type: 'radio';
      }
    | {
        children: React.ReactElement[];
        onBlur?: React.FocusEventHandler<HTMLSelectElement>;
        onChange?: React.ChangeEventHandler<HTMLSelectElement>;
        onFocus?: React.FocusEventHandler<HTMLSelectElement>;
        type: 'select';
      }
    | {
        onChange?: (value: boolean) => void;
        type: 'toggle';
      }
    | {
        onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
        onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
        onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
        type: 'textarea';
      }
  );
