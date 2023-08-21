import { FieldValues, UseFormRegister } from 'react-hook-form';
import { omit } from '@gilbarbara/helpers';
import { PlainObject, StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { clearNumber } from '~/modules/helpers';
import {
  validateEmail,
  validateMatchField,
  validatePassword,
  validatePhone,
} from '~/modules/validations';

import { FieldProps, RegisterOptionsProps } from './types';

export function getError(name: string, errors: PlainObject<any>) {
  const { message, type } = errors[name] ?? {};

  if (message) {
    return [message, type];
  }

  return [null];
}

export function getInputParameters(props: FieldProps, ...exclude: any[]) {
  return omit(
    props,
    'assistiveText',
    'children',
    'clearError',
    'debug',
    'dropdownProps',
    'formatter',
    'hideAssistiveText',
    'label',
    'maxLength',
    'minLength',
    'onBlur',
    'onChange',
    'onFocus',
    'required',
    'setValueAs',
    'skipValidation',
    'type',
    'validations',
    'value',
    ...exclude,
  );
}

export function getRegisterOptions(
  props: RegisterOptionsProps,
): Partial<UseFormRegister<FieldValues>> {
  const {
    formatter = '',
    getValues,
    maxLength,
    minLength,
    required,
    setValueAs,
    type = 'text',
    validationOptions,
    validations = [],
    value,
  } = props;
  const registerOptions = {} as PlainObject;

  if (!is.undefined(value) || ['checkbox', 'toggle'].includes(type)) {
    registerOptions.value = getDefaultValue(value, type);
  }

  if (required) {
    registerOptions.required = 'Required';
  }

  if (minLength) {
    registerOptions.minLength = {
      value: minLength,
      message: `Min. Characters: ${minLength}`,
    };
  }

  if (maxLength) {
    registerOptions.maxLength = {
      value: maxLength,
      message: `Max. Characters: ${maxLength}`,
    };
  }

  if (['money', 'number', 'phoneBR'].includes(formatter)) {
    registerOptions.setValueAs = (v: StringOrNumber) => {
      if (!v) {
        return undefined;
      }

      return is.number(v) ? v : Number(clearNumber(v));
    };
  }

  if (setValueAs) {
    registerOptions.setValueAs = setValueAs;
  }

  const validated = validations
    .map(d => {
      let result;

      if (d === 'email') {
        result = validateEmail;
      }

      if (d === 'password') {
        result = validatePassword;
      }

      if (d.startsWith('phone')) {
        result = validatePhone;
      }

      if (d.startsWith('equalsTo:')) {
        const [, field] = d.split(':');

        result = { field, fn: validateMatchField };
      }

      return result;
    })
    .filter(Boolean);

  if (validated.length) {
    registerOptions.validate = validated.reduce((acc, validation) => {
      if (is.undefined(validation)) {
        return acc;
      }

      const fnName = is.function(validation) ? validation.name : validation.fn.name;

      acc[fnName] = (value_: string) => {
        const input = value_ ? `${value_}` : '';
        let response;

        if (is.function(validation)) {
          response = validation(input, validationOptions);
        } else if (validation.field && is.function(validation.fn)) {
          const actualValues = getValues();

          response = validation.fn(`${actualValues[validation.field]}`, input);
        }

        return response;
      };

      return acc;
    }, {} as PlainObject);
  }

  return registerOptions;
}

export function getDefaultValue(value: any, type: FieldProps['type']) {
  if (type === 'checkbox') {
    return value ?? [];
  } else if (type === 'toggle') {
    return value ?? false;
  }

  return value;
}
