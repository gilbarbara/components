import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useUpdateEffect } from 'react-use';

import { Field } from './Field';
import { getError } from './utils';

import { Checkbox } from '../CheckboxAndRadio';
import { FormGroup, FormGroupProps } from '../FormGroup';
import { Group } from '../Group';
import { Text } from '../Text';
import { CheckboxOption, FieldProps } from '../types';

interface FieldCheckboxesProps
  extends Pick<
    FieldProps,
    'assistiveText' | 'label' | 'name' | 'required' | 'skipValidation' | 'value'
  > {
  individual?: boolean;
  options: CheckboxOption[];
}

export function FieldCheckboxGroup(props: FieldCheckboxesProps) {
  const {
    assistiveText,
    individual,
    label,
    name = 'CheckboxGroup',
    options,
    required,
    skipValidation,
  } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const currentValue: string[] = watch(name, []);

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

  const [error] = getError(name, errors);
  const groupProps: Partial<FormGroupProps> = { skipIcon: true };

  if (!skipValidation) {
    groupProps.error = error;
    groupProps.valid = !error;
  }

  return (
    <FormGroup
      ref={ref}
      assistiveText={assistiveText}
      data-component-name="FieldCheckboxGroup"
      label={label}
      labelInfo={required && <Text variant="primary">*</Text>}
      minHeight={72}
      {...groupProps}
    >
      {!individual && <Field name={name} required={required} type="hidden" value={[]} />}
      <Group mb="xs">
        {options.map(d =>
          individual ? (
            <Field key={d.name} style={{ marginBottom: 0 }} type="checkbox" {...d} />
          ) : (
            <Checkbox
              key={d.name}
              defaultChecked={currentValue.includes(d.name)}
              label={d.label}
              name={d.name}
              onChange={handleChange}
              size="sm"
            />
          ),
        )}
      </Group>
    </FormGroup>
  );
}
