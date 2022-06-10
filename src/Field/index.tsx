import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSetState, useUnmount } from 'react-use';
import { AnyObject } from '@gilbarbara/types';

import FieldCheckbox from './Checkbox';
import FieldDebug from './Debug';
import FieldDropdown from './Dropdown';
import FieldInput from './Input';
import FieldRadio from './Radio';
import FieldSelect from './Select';
import FieldTextarea from './Textarea';
import FieldToggle from './Toggle';
import {
  FieldCheckboxProps,
  FieldDropdownProps,
  FieldInputProps,
  FieldProps,
  FieldRadioProps,
  FieldSelectProps,
  FieldTextareaProps,
  FieldToggleProps,
} from './types';
import { getDefaultValue, getError, getRegisterOptions } from './utils';

import { FormGroup } from '../FormGroup';

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
    type = 'text',
    validations,
    value,
  } = props;
  const [{ isActive, isDirty }, setStatus] = useSetState({
    isActive: false,
    isDirty: false,
  });

  const {
    formState: { dirtyFields, errors },
    getValues,
    register,
    setValue,
    unregister,
  } = useFormContext();
  const registerOptions = useMemo(
    () => getRegisterOptions({ ...props, getValues }),
    [getValues, props],
  );
  const registration = register(name, registerOptions);

  const currentValue = useWatch({
    name,
    defaultValue: getDefaultValue(value || getValues()[name], type),
  });
  const [error, errorType = ''] = getError(name, errors);

  useUnmount(() => {
    unregister(name);
  });

  const showError = !!error && errorType !== 'revalidate' && (!isActive || isDirty);
  const isValid = !!currentValue && !error && (required || validations?.length);

  const groupProps: AnyObject = {
    assistiveText,
    hideAssistiveText,
    inline,
    label,
    labelId: id || name,
    required,
    style,
  };
  const output: AnyObject = { error };

  /* istanbul ignore else */
  if (!skipValidation) {
    groupProps.skipIcon = ['checkbox', 'dropdown', 'radio', 'select', 'toggle'].includes(type);

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

Field.defaultProps = {
  debug: false,
  disabled: false,
  hideAssistiveText: false,
  inline: false,
  label: '',
  readOnly: false,
  required: false,
  skipValidation: false,
  type: 'text',
};

export { FieldProps } from './types';
