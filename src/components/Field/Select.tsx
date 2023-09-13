import { ChangeEvent, FocusEvent, useCallback } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Select } from '~/components/Select';

import { FieldSelectProps } from './types';
import { getInputParameters } from './utils';

interface Props extends FieldSelectProps {
  isDirty: boolean;
  registration: UseFormRegisterReturn;
  setStatus: (status: { isActive?: boolean; isDirty?: boolean }) => void;
}

function FieldSelect(props: Props) {
  const { children, id, isDirty, name, onBlur, onChange, onFocus, registration, setStatus } = props;
  const handleBlur = useCallback(
    (event: FocusEvent<HTMLSelectElement>) => {
      setStatus({ isActive: false, isDirty });

      registration.onBlur(event);

      onBlur?.(event);
    },
    [isDirty, onBlur, registration, setStatus],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLSelectElement>) => {
      setStatus({ isActive: true });

      onFocus?.(event);
    },
    [onFocus, setStatus],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      registration.onChange(event);

      onChange?.(event.target.value);
    },
    [onChange, registration],
  );

  const input = {
    ...getInputParameters(props, 'isDirty', 'registration', 'setStatus'),
    id: id ?? name,
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

FieldSelect.displayName = 'FieldSelect';

export default FieldSelect;
