import { useCallback } from 'react';
import { FieldValues, SetFieldValue, UseFormRegisterReturn } from 'react-hook-form';
import is from 'is-lite';

import { FieldDropdownProps } from './types';
import { getInputParameters } from './utils';

import { Dropdown } from '../Dropdown';
import { DropdownOption } from '../types';

interface Props extends FieldDropdownProps {
  currentValue: any;
  registration: UseFormRegisterReturn;
  setValue: SetFieldValue<FieldValues>;
}

function FieldDropdown(props: Props): JSX.Element {
  const { currentValue, dropdownProps = {}, items = [], name, onChange, setValue } = props;

  const handleChangeDropdown = useCallback(
    (data: DropdownOption[]) => {
      const { multi } = dropdownProps;
      const setValueOptions = { shouldDirty: true, shouldValidate: true };

      if (multi) {
        const values = data.map(d => d.value);

        setValue(name, values, setValueOptions);

        if (onChange && (!currentValue || currentValue !== values)) {
          onChange(data);
        }
      } else {
        const [selected] = data;

        /* istanbul ignore else */
        if (selected) {
          setValue(name, selected.value, setValueOptions);

          if (onChange && (!currentValue || currentValue !== selected.value)) {
            onChange(data);
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

export default FieldDropdown;
