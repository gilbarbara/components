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
} from './types';
import { getDefaultValue, getError, getRegisterOptions } from './utils';

export const defaultProps = {
  accent: 'primary',
  borderless: false,
  debug: false,
  disabled: false,
  hideAssistiveText: false,
  inline: false,
  label: '',
  readOnly: false,
  required: false,
  skipValidation: false,
  type: 'text',
} satisfies Omit<FieldProps, 'name'>;

export function Field<T extends FieldProps>(props: T) {
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
  } = { ...defaultProps, ...props };
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
    () => getRegisterOptions({ ...props, getValues }),
    [getValues, props],
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
          {...(props as FieldCheckboxProps)}
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
          {...(props as FieldDatePickerProps)}
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
          {...(props as FieldDropdownProps)}
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
          {...(props as FieldPasswordProps)}
        />
      );

      break;
    }
    case 'radio': {
      output.content = <FieldRadio registration={registration} {...(props as FieldRadioProps)} />;

      break;
    }
    case 'select': {
      output.content = (
        <FieldSelect
          isDirty={!!dirtyFields[name]}
          registration={registration}
          setStatus={setStatus}
          {...(props as FieldSelectProps)}
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
          {...(props as FieldTextareaProps)}
        />
      );

      break;
    }
    case 'toggle': {
      output.content = <FieldToggle {...(props as FieldToggleProps)} setValue={setValue} />;

      break;
    }
    default: {
      output.content = (
        <FieldInput
          currentValue={currentValue}
          isDirty={!!dirtyFields[name]}
          registration={registration}
          setStatus={setStatus}
          {...(props as FieldInputProps)}
        />
      );
    }
  }

  if (type === 'hidden') {
    return output.content;
  }

  return (
    <FormGroup data-component-name="Field" {...groupProps}>
      {output.content}
      <FieldDebug {...props} />
    </FormGroup>
  );
}

Field.displayName = 'Field';

export type { FieldProps } from './types';
