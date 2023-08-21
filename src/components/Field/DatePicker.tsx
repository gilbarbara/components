import { useCallback } from 'react';
import { FieldValues, SetFieldValue, UseFormRegisterReturn } from 'react-hook-form';
import is from 'is-lite';

import { DatePickerSelector } from '~/components/DatePicker';
import { DatePickerRangeParameter } from '~/components/DatePicker/types';

import { FieldDatePickerProps } from './types';
import { getInputParameters } from './utils';

interface Props extends FieldDatePickerProps {
  currentValue: any;
  registration: UseFormRegisterReturn;
  setValue: SetFieldValue<FieldValues>;
}

function FieldDatePicker(props: Props) {
  const { currentValue, datePickerProps = { mode: 'single' }, name, onChange, setValue } = props;

  const handleChange = useCallback(
    (selection: DatePickerRangeParameter | string) => {
      const setValueOptions = { shouldDirty: true, shouldValidate: true };
      const value = is.array(selection) ? selection.filter(Boolean).join(',') : selection;

      setValue(name, value, setValueOptions);

      if (onChange && (!currentValue || currentValue !== value)) {
        onChange(value);
      }
    },
    [setValue, name, onChange, currentValue],
  );

  const parameters = getInputParameters(props, 'currentValue', 'registration', 'setValue');

  let selected = currentValue;

  if (datePickerProps.mode === 'range') {
    selected = currentValue?.split(',') ?? [undefined, undefined];
  }

  return (
    <DatePickerSelector
      selected={selected}
      {...parameters}
      {...datePickerProps}
      onChange={handleChange}
    />
  );
}

FieldDatePicker.displayName = 'FieldDatePicker';

export default FieldDatePicker;
