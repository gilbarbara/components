import { useCallback } from 'react';
import { Controller, FieldValues, UseFormSetValue } from 'react-hook-form';
import innerText from 'react-innertext';
import is from 'is-lite';

import { Toggle } from '~/components/Toggle';

import { FieldToggleProps } from './useField';

interface Props extends FieldToggleProps {
  setValue: UseFormSetValue<FieldValues>;
}

function FieldToggle(props: Props) {
  const { accent, disabled, label, name, onChange, required, setValue, toggleProps } = props;

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
            aria-label={innerText(label)}
            checked={is.undefined(field.value) ? false : field.value}
            disabled={disabled}
            name={name}
            onToggle={handleToggle}
            {...toggleProps}
          />
        );
      }}
      rules={{ required }}
    />
  );
}

FieldToggle.displayName = 'FieldToggle';

export default FieldToggle;
