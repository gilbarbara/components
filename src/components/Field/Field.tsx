import { ReactNode, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSetState, useUnmount } from '@gilbarbara/hooks';
import { PlainObject } from '@gilbarbara/types';

import { FormGroup } from '~/components/FormGroup';

import FieldCheckbox from './Checkbox';
import FieldDatePicker from './DatePicker';
import FieldDebug from './Debug';
import FieldDropdown from './Dropdown';
import FieldInput from './Input';
import FieldRadio from './Radio';
import FieldSelect from './Select';
import FieldTextarea from './Textarea';
import FieldToggle from './Toggle';
import {
  FieldCheckboxProps,
  FieldDatePickerProps,
  FieldDropdownProps,
  FieldInputProps,
  FieldPasswordProps,
  FieldProps,
  FieldRadioProps,
  FieldSelectProps,
  FieldTextareaProps,
  FieldToggleProps,
  useField,
} from './useField';
import { getDefaultValue, getError, getRegisterOptions } from './utils';

export function Field<T extends FieldProps>(props: T) {
  const { componentProps, getDataAttributes } = useField(props);
  const {
    assistiveText,
    hideAssistiveText,
    id,
    inline,
    label,
    name,
    required,
    skipValidation,
    style,
    type,
    validations,
    value,
  } = componentProps;
  const [{ isActive, isDirty }, setStatus] = useSetState({
    isActive: false,
    isDirty: false,
  });
  const formContext = useFormContext();

  if (!formContext) {
    throw new Error(
      'could not find the "form" context value; please ensure the component is wrapped in a <Form>',
    );
  }

  const {
    formState: { dirtyFields, errors },
    getValues,
    register,
    setValue,
    unregister,
  } = formContext;
  const registerOptions = useMemo(
    () => getRegisterOptions({ ...componentProps, getValues }),
    [getValues, componentProps],
  );
  const registration = register(name, registerOptions);

  const currentValue = useWatch({
    name,
    defaultValue: getDefaultValue(value ?? getValues()[name], type),
  });
  const [error, errorType = ''] = getError(name, errors);

  useUnmount(() => {
    unregister(name);
  });

  const showError = !!error && errorType !== 'revalidate' && (!isActive || isDirty);
  const isValid = !!currentValue && !error && (required ?? validations?.length);

  const groupProps: PlainObject = {
    assistiveText,
    hideAssistiveText,
    inline,
    label,
    labelId: id ?? name,
    required,
    style,
  };
  const output: PlainObject<ReactNode> = { error };

  if (!skipValidation) {
    groupProps.skipIcon = [
      'checkbox',
      'color',
      'datePicker',
      'dropdown',
      'radio',
      'select',
      'toggle',
    ].includes(type);

    if (showError) {
      groupProps.error = error;
      groupProps.valid = false;
    } else if (isValid) {
      groupProps.valid = true;
    }
  }

  switch (type) {
    case 'checkbox': {
      output.content = (
        <FieldCheckbox
          currentValue={currentValue}
          setValue={setValue}
          {...(componentProps as FieldCheckboxProps)}
        />
      );

      break;
    }
    case 'datePicker': {
      output.content = (
        <FieldDatePicker
          currentValue={currentValue}
          registration={registration}
          setValue={setValue}
          {...(componentProps as FieldDatePickerProps)}
        />
      );

      break;
    }
    case 'dropdown': {
      output.content = (
        <FieldDropdown
          currentValue={currentValue}
          registration={registration}
          setValue={setValue}
          {...(componentProps as FieldDropdownProps)}
        />
      );

      break;
    }
    case 'password': {
      output.content = (
        <FieldInput
          currentValue={currentValue}
          isDirty={!!dirtyFields[name]}
          registration={registration}
          setStatus={setStatus}
          {...(componentProps as FieldPasswordProps)}
        />
      );

      break;
    }
    case 'radio': {
      output.content = (
        <FieldRadio registration={registration} {...(componentProps as FieldRadioProps)} />
      );

      break;
    }
    case 'select': {
      output.content = (
        <FieldSelect
          isDirty={!!dirtyFields[name]}
          registration={registration}
          setStatus={setStatus}
          {...(componentProps as FieldSelectProps)}
        />
      );

      break;
    }
    case 'textarea': {
      output.content = (
        <FieldTextarea
          isDirty={!!dirtyFields[name]}
          registration={registration}
          setStatus={setStatus}
          {...(componentProps as FieldTextareaProps)}
        />
      );

      break;
    }
    case 'toggle': {
      output.content = (
        <FieldToggle {...(componentProps as FieldToggleProps)} setValue={setValue} />
      );

      break;
    }
    default: {
      output.content = (
        <FieldInput
          currentValue={currentValue}
          isDirty={!!dirtyFields[name]}
          registration={registration}
          setStatus={setStatus}
          {...(componentProps as FieldInputProps)}
        />
      );
    }
  }

  if (type === 'hidden') {
    return output.content;
  }

  return (
    <FormGroup {...getDataAttributes('Field')} {...groupProps}>
      {output.content}
      <FieldDebug {...componentProps} />
    </FormGroup>
  );
}

Field.displayName = 'Field';

export { defaultProps, type FieldProps } from './useField';
