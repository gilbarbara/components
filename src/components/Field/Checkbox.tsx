import { ChangeEvent, useRef } from 'react';
import { FieldValues, SetFieldValue } from 'react-hook-form';
import { useUpdateEffect } from 'react-use';

import { Checkbox } from '~/components/CheckboxAndRadio';
import { Spacer } from '~/components/Spacer';

import { FieldCheckboxProps } from './types';

interface Props extends FieldCheckboxProps {
  currentValue: string[];
  setValue: SetFieldValue<FieldValues>;
}

function FieldCheckbox(props: Props) {
  const { currentValue, items = [], name = 'CheckboxGroup', onChange, setValue } = props;
  const ref = useRef<HTMLDivElement>(null);

  useUpdateEffect(() => {
    currentValue.forEach(d => {
      const input = ref.current?.querySelector(`[name=${d}]`) as HTMLInputElement;

      if (input) {
        input.checked = true;
      }
    });
  }, [currentValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    const nextValue = target.checked
      ? [...currentValue, target.name]
      : currentValue?.filter(d => d !== target.name);

    setValue(name, nextValue, { shouldDirty: true, shouldValidate: true });

    if (onChange) {
      onChange(nextValue);
    }
  };

  return (
    <Spacer mb="xs">
      {items.map(d => (
        <Checkbox
          key={d.name}
          defaultChecked={currentValue.includes(d.name)}
          label={d.label}
          name={d.name}
          onChange={handleChange}
          size="sm"
        />
      ))}
    </Spacer>
  );
}

FieldCheckbox.displayName = 'FieldCheckbox';

export default FieldCheckbox;
