import { ChangeEvent, useRef } from 'react';
import { FieldValues, SetFieldValue } from 'react-hook-form';
import { useUpdateEffect } from 'react-use';

import { FieldCheckboxProps } from './types';

import { Checkbox } from '../CheckboxAndRadio';
import { Spacer } from '../Spacer';

interface Props extends FieldCheckboxProps {
  currentValue: string[];
  setValue: SetFieldValue<FieldValues>;
}

function FieldCheckbox(props: Props) {
  const { currentValue, items = [], name = 'CheckboxGroup', setValue } = props;
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

export default FieldCheckbox;
