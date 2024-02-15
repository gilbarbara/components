import { useCallback } from 'react';
import { FieldValues, SetFieldValue, UseFormRegisterReturn } from 'react-hook-form';
import is from 'is-lite';

import { Dropdown } from '~/components/Dropdown';

import { DropdownOption } from '~/types';

import { FieldDropdownProps } from './types';
import { getInputParameters } from './utils';

interface Props extends FieldDropdownProps {
  currentValue: any;
  registration: UseFormRegisterReturn;
  setValue: SetFieldValue<FieldValues>;
}

function FieldDropdown(props: Props) {
  const { currentValue, dropdownProps = {}, items = [], name, onChange, setValue } = props;

  const handleChangeDropdown = useCallback(
    (data: DropdownOption[]) => {
      const { multi } = dropdownProps;
      const setValueOptions = { shouldDirty: true, shouldValidate: true };

      if (multi) {
        const values = data.map(d => d.value);

        setValue(name, values, setValueOptions);

        if (onChange && (!currentValue || currentValue !== values)) {
          onChange(values);
        }
      } else {
        const [selected] = data;

        if (selected) {
          setValue(name, selected.value, setValueOptions);

          if (onChange && (!currentValue || currentValue !== selected.value)) {
            onChange(selected.value);
          }
        } else {
          setValue(name, undefined, setValueOptions);
        }
      }
    },
    [dropdownProps, setValue, name, onChange, currentValue],
  );

  const parameters = getInputParameters(props, 'currentValue', 'registration', 'setValue');

  return (
    <Dropdown
      items={items}
      values={items.filter((d: DropdownOption) =>
        is.array(currentValue) ? currentValue.includes(d.value) : d.value === currentValue,
      )}
      width="100%"
      {...parameters}
      {...dropdownProps}
      onChange={handleChangeDropdown}
    />
  );
}

FieldDropdown.displayName = 'FieldDropdown';

export default FieldDropdown;
