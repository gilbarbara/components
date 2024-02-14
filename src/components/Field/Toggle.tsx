import { useCallback } from 'react';
import { Controller, FieldValues, UseFormSetValue } from 'react-hook-form';
import is from 'is-lite';

import { Toggle } from '~/components/Toggle';

import { FieldToggleProps } from './types';

interface Props extends FieldToggleProps {
  setValue: UseFormSetValue<FieldValues>;
}

function FieldToggle(props: Props) {
  const { accent, disabled, name, onChange, required, setValue } = props;

  const handleToggle = useCallback(
    (status: boolean) => {
      setValue(name, status, {
        shouldDirty: true,
        shouldValidate: true,
      });
      onChange?.(status);
    },
    [name, onChange, setValue],
  );

  return (
    <Controller
      name={name}
      render={({ field }) => {
        return (
          <Toggle
            accent={accent}
            checked={is.undefined(field.value) ? false : field.value}
            disabled={disabled}
            name={name}
            onToggle={handleToggle}
          />
        );
      }}
      rules={{ required }}
    />
  );
}

FieldToggle.displayName = 'FieldToggle';

export default FieldToggle;
