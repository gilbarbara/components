import { useCallback } from 'react';
import { Controller, FieldValues, UseFormSetValue } from 'react-hook-form';
import is from 'is-lite';

import { FieldToggleProps } from './types';

import { Toggle } from '../Toggle';

interface Props extends FieldToggleProps {
  setValue: UseFormSetValue<FieldValues>;
}

function FieldToggle(props: Props): JSX.Element {
  const { disabled, name, onChange, required, setValue } = props;

  const handleClickToggle = useCallback(
    (status: boolean) => {
      const nextValue = !status;

      setValue(name, nextValue, {
        shouldDirty: true,
        shouldValidate: true,
      });

      if (onChange) {
        onChange(nextValue);
      }
    },
    [name, onChange, setValue],
  );

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Toggle
          checked={is.undefined(field.value) ? false : field.value}
          disabled={disabled}
          name={name}
          onClick={handleClickToggle}
        />
      )}
      rules={{ required }}
    />
  );
}

export default FieldToggle;
