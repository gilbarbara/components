import { ChangeEvent, FocusEvent, useCallback } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { formatMoney, formatPhoneBR, formatPhoneUS } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';

import { clearNumber } from '~/modules/helpers';

import { Input } from '~/components/Input';
import { InputColor } from '~/components/InputColor';
import { InputFile } from '~/components/InputFile';

import { InputTypes, ValidatePasswordOptions } from '~/types';

import { FieldInputProps } from './types';
import { getInputParameters } from './utils';

interface Props extends Omit<FieldInputProps, 'type' | 'validationOptions'> {
  currentValue: any;
  isDirty: boolean;
  registration: UseFormRegisterReturn;
  setStatus: (status: { isActive?: boolean; isDirty?: boolean }) => void;
  type: InputTypes;
  validationOptions?: ValidatePasswordOptions;
}

function FieldInput(props: Props) {
  const {
    accent,
    currentValue,
    formatter = '',
    id,
    isDirty,
    name,
    onBlur,
    onChange,
    onFocus,
    registration,
    setStatus,
    skipValidation,
    type,
  } = props;

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setStatus({ isActive: false, isDirty });

      registration.onBlur(event);

      onBlur?.(event);
    },
    [isDirty, onBlur, registration, setStatus],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setStatus({ isActive: true });

      onFocus?.(event);
    },
    [onFocus, setStatus],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (['phoneBR', 'phoneUS'].includes(formatter)) {
        event.target.value = clearNumber(value).slice(0, 11);
      } else if (formatter) {
        event.target.value = clearNumber(value);
      }

      registration.onChange(event);

      onChange?.(value);
    },
    [formatter, onChange, registration],
  );

  const input = {
    ...getInputParameters(
      props as FieldInputProps,
      'currentValue',
      'inline',
      'isDirty',
      'registration',
      'setStatus',
    ),
    id: id ?? name,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
  };

  let content;

  switch (type) {
    case 'color': {
      content = <InputColor {...registration} {...input} value={currentValue} />;
      break;
    }
    case 'file': {
      content = (
        <InputFile
          accent={accent}
          {...registration}
          {...input}
          value={currentValue?.length ? currentValue[0].name : ''}
        />
      );
      break;
    }
    case 'hidden': {
      content = <input {...registration} {...input} type="hidden" />;
      break;
    }
    default: {
      const parameters: PlainObject<string> = {};

      if (currentValue) {
        switch (formatter) {
          case 'money': {
            parameters.value = formatMoney(currentValue);

            break;
          }
          case 'phoneBR': {
            parameters.value = formatPhoneBR(`${currentValue}`);

            break;
          }
          case 'phoneUS': {
            parameters.value = formatPhoneUS(`${currentValue}`);

            break;
          }
        }
      }

      content = (
        <Input
          {...registration}
          {...input}
          {...parameters}
          suffixSpacing={!skipValidation}
          type={type}
        />
      );
      break;
    }
  }

  return content;
}

FieldInput.displayName = 'FieldInput';

export default FieldInput;
