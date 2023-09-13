import { ChangeEvent, FocusEvent, useCallback } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Textarea } from '~/components/Textarea';

import { FieldTextareaProps } from './types';
import { getInputParameters } from './utils';

interface Props extends FieldTextareaProps {
  isDirty: boolean;
  registration: UseFormRegisterReturn;
  setStatus: (status: { isActive?: boolean; isDirty?: boolean }) => void;
}

function FieldTextarea(props: Props) {
  const { id, isDirty, name, onBlur, onChange, onFocus, registration, setStatus, skipValidation } =
    props;
  const handleBlur = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      setStatus({ isActive: false, isDirty });

      registration.onBlur(event);

      onBlur?.(event);
    },
    [isDirty, onBlur, registration, setStatus],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      setStatus({ isActive: true });

      onFocus?.(event);
    },
    [onFocus, setStatus],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
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

  return <Textarea {...registration} {...input} suffixSpacing={!skipValidation} />;
}

FieldTextarea.displayName = 'FieldTextarea';

export default FieldTextarea;
