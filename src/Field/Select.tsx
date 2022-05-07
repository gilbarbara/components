import { ChangeEvent, FocusEvent, useCallback } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldSelectProps } from './types';
import { getInputParameters } from './utils';

import { Select } from '../Select';

interface Props extends FieldSelectProps {
  isDirty: boolean;
  registration: UseFormRegisterReturn;
  setStatus: (status: { isActive?: boolean; isDirty?: boolean }) => void;
}

function FieldSelect(props: Props): JSX.Element {
  const { children, id, isDirty, name, onBlur, onChange, onFocus, registration, setStatus } = props;
  const handleBlur = useCallback(
    (event: FocusEvent<HTMLSelectElement>) => {
      setStatus({ isActive: false, isDirty });

      registration.onBlur(event);

      if (onBlur) {
        onBlur(event);
      }
    },
    [isDirty, onBlur, registration, setStatus],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLSelectElement>) => {
      setStatus({ isActive: true });

      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus, setStatus],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      registration.onChange(event);

      if (onChange) {
        onChange(event);
      }
    },
    [onChange, registration],
  );

  const input = {
    ...getInputParameters(props, 'isDirty', 'registration', 'setStatus'),
    id: id || name,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
  };

  return (
    <Select {...registration} {...input}>
      {children}
    </Select>
  );
}

export default FieldSelect;
