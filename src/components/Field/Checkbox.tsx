import { ChangeEvent, useRef } from 'react';
import { FieldValues, SetFieldValue } from 'react-hook-form';
import { useUpdateEffect } from '@gilbarbara/hooks';

import { Checkbox } from '~/components/CheckboxAndRadio';
import { Flex } from '~/components/Flex';

import { FieldCheckboxProps } from './useField';

interface Props extends FieldCheckboxProps {
  currentValue: string[];
  setValue: SetFieldValue<FieldValues>;
}

function FieldCheckbox(props: Props) {
  const {
    accent,
    borderless,
    currentValue,
    disabled,
    items = [],
    name = 'CheckboxGroup',
    onChange,
    readOnly,
    setValue,
  } = props;
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

    onChange?.(nextValue);
  };

  return (
    <Flex gap="xs">
      {items.map(d => (
        <Checkbox
          key={d.name}
          accent={accent}
          borderless={borderless}
          defaultChecked={currentValue.includes(d.name)}
          disabled={disabled}
          label={d.label}
          name={d.name}
          onChange={handleChange}
          readOnly={readOnly}
          size="sm"
        />
      ))}
    </Flex>
  );
}

FieldCheckbox.displayName = 'FieldCheckbox';

export default FieldCheckbox;
