import { FieldValues, UseFormRegister } from 'react-hook-form';
import { AnyObject } from '@gilbarbara/types';
import is from 'is-lite';

import { clearNumber } from '../modules/helpers';
import {
  validateEmail,
  validateMatchField,
  validatePassword,
  validatePhoneBR,
} from '../modules/validations';
import { FieldProps, RegisterOptionsProps } from '../types';

export function getError(name: string, errors: AnyObject) {
  const { message, type } = errors[name] || {};

  if (message) {
    return [message, type];
  }

  return [null];
}

export function getRegisterOptions(
  props: RegisterOptionsProps,
): Partial<UseFormRegister<FieldValues>> {
  const {
    maxLength,
    minLength,
    required,
    formatter = '',
    validations = [],
    setValueAs,
    type = 'text',
    value,
  } = props;
  const registerOptions = {} as AnyObject;

  if (!is.undefined(value) || ['checkbox', 'toggle'].includes(type)) {
    registerOptions.value = getDefaultValue(value, type);
  }

  if (required) {
    registerOptions.required = 'Obrigatório';
  }

  if (minLength) {
    registerOptions.minLength = {
      value: minLength,
      message: `Min. Caracters: ${minLength}`,
    };
  }

  if (maxLength) {
    registerOptions.maxLength = {
      value: maxLength,
      message: `Max. Caracters: ${maxLength}`,
    };
  }

  if (['moneyBR', 'number', 'phoneBR'].includes(formatter)) {
    registerOptions.setValueAs = (v: string | number) => {
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

      if (d === 'phoneBR') {
        result = validatePhoneBR;
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
          response = validation(input);
        } else if (validation.field && is.function(validation.fn)) {
          const actualValues = props.getValues();

          response = validation.fn(`${actualValues[validation.field]}`, input);
        }

        return response;
      };

      return acc;
    }, {} as AnyObject);
  }

  return registerOptions;
}

export function getDefaultValue(value: any, type: FieldProps['type']) {
  if (type === 'toggle') {
    return value || false;
  }

  return value;
}
