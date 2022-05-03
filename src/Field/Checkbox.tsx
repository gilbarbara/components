import * as React from 'react';
import { FieldValues, SetFieldValue } from 'react-hook-form';
import { useUpdateEffect } from 'react-use';

import { FieldCheckboxProps } from './types';

import { Checkbox } from '../CheckboxAndRadio';
import { Group } from '../Group';

interface Props extends FieldCheckboxProps {
  currentValue: string[];
  setValue: SetFieldValue<FieldValues>;
}

function FieldCheckbox(props: Props) {
  const { currentValue, name = 'CheckboxGroup', options = [], setValue } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  useUpdateEffect(() => {
    currentValue.forEach(d => {
      const input = ref.current?.querySelector(`[name=${d}]`) as HTMLInputElement;

      if (input) {
        input.checked = true;
      }
    });
  }, [currentValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    const nextValue = target.checked
      ? [...currentValue, target.name]
      : currentValue?.filter(d => d !== target.name);

    setValue(name, nextValue, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <Group mb="xs">
      {options.map(d => (
        <Checkbox
          key={d.name}
          defaultChecked={currentValue.includes(d.name)}
          label={d.label}
          name={d.name}
          onChange={handleChange}
          size="sm"
        />
      ))}
    </Group>
  );
}

export default FieldCheckbox;
