import * as React from 'react';
import { Controller, FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { useSetState, useUnmount } from 'react-use';
import { formatMoney, formatPhoneBR } from '@gilbarbara/helpers';
import { AnyObject } from '@gilbarbara/types';
import is from 'is-lite';

import FieldDebug from './Debug';
import { getDefaultValue, getError, getRegisterOptions } from './utils';

import { Box } from '../Box';
import { Checkbox, Radio } from '../CheckboxAndRadio';
import { Dropdown } from '../Dropdown';
import { FormGroup } from '../FormGroup';
import { Group } from '../Group';
import { Input } from '../Input';
import { clearNumber } from '../modules/helpers';
import { Select } from '../Select';
import { Text } from '../Text';
import { Textarea } from '../Textarea';
import { Toggle } from '../Toggle';
import { DropdownOption, FieldProps, Option } from '../types';

export function Field(props: FieldProps) {
  const {
    assistiveText,
    children,
    clearError,
    debug,
    dropdownOptions,
    filter,
    formatter,
    hideAssistiveText,
    label,
    options = [],
    required,
    setError,
    skipValidation,
    type = 'text',
    style,
    value,
    ...input
  } = props;
  const { disabled, name, onBlur, onChange, onFocus } = input;
  const [{ isActive, isDirty }, setStatus] = useSetState({
    isActive: false,
    isDirty: false,
  });

  const {
    control,
    formState: { dirtyFields, errors },
    getValues,
    register,
    setValue,
    unregister,
  } = useFormContext();
  const registerOptions = React.useMemo(
    () => getRegisterOptions({ ...props, getValues }),
    [getValues, props],
  );
  const registration = register(name, registerOptions);

  const currentValue = useWatch<FieldValues>({
    control,
    name,
    defaultValue: getDefaultValue(value, type),
  });
  const [error, errorType = ''] = getError(name, errors);

  useUnmount(() => {
    unregister(name);
  });

  const handleFocus = React.useCallback(
    event => {
      setStatus({ isActive: true });

      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus, setStatus],
  );

  const handleBlur = React.useCallback(
    event => {
      setStatus({ isActive: false, isDirty: !!dirtyFields[name] });

      registration.onBlur(event);

      if (onBlur) {
        onBlur(event);
      }
    },
    [dirtyFields, name, onBlur, registration, setStatus],
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (formatter === 'phoneBR') {
        event.target.value = clearNumber(event.target.value).slice(0, 11);
      } else if (formatter) {
        event.target.value = clearNumber(event.target.value);
      }

      registration.onChange(event);

      if (onChange) {
        onChange(event);
      }
    },
    [formatter, onChange, registration],
  );

  const handleChangeDropdown = React.useCallback(
    (data: DropdownOption[]) => {
      const { multi } = dropdownOptions;

      if (multi) {
        setValue(
          name,
          data.map(d => d.value),
          { shouldDirty: true, shouldValidate: true },
        );

        if (onChange && (!currentValue || currentValue !== data)) {
          onChange(data);
        }
      } else {
        const [selected] = data;

        /* istanbul ignore else */
        if (selected) {
          setValue(name, selected.value, { shouldDirty: true, shouldValidate: true });

          if (onChange && (!currentValue || currentValue !== selected.value)) {
            onChange(data);
          }
        }
      }
    },
    [dropdownOptions, setValue, name, onChange, currentValue],
  );

  const handleClickToggle = React.useCallback(
    (status: boolean) => {
      const nextValue = !status;

      setValue(name, nextValue, {
        shouldDirty: true,
        shouldValidate: true,
      });

      if (onChange) {
        onChange(nextValue);
      }
    },
    [name, onChange, setValue],
  );

  input.id = input.id || name;
  input.onBlur = handleBlur;
  input.onChange = handleChange;
  input.onFocus = handleFocus;

  const showError = !!error && errorType !== 'revalidate' && (!isActive || isDirty);
  const isValid = !!currentValue && !error;

  const groupProps: AnyObject = {};
  const output: AnyObject = { error };
  let minHeight = label ? 102 : 72;

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
      output.content = <Checkbox {...registration} label={label} size="sm" {...input} />;

      break;
    }
    case 'dropdown': {
      output.content = (
        <Dropdown
          {...input}
          values={dropdownOptions.options.filter((d: DropdownOption) =>
            is.array(currentValue) ? currentValue.includes(d.value) : d.value === currentValue,
          )}
          width="100%"
          {...dropdownOptions}
          onChange={handleChangeDropdown}
        />
      );

      break;
    }
    case 'radio': {
      minHeight = hideAssistiveText ? 45 : 70;
      output.content = (
        <Group mb="xs">
          {options.map((d: Option) => (
            <Radio key={d.value} {...d} {...registration} size="sm" />
          ))}
        </Group>
      );

      break;
    }
    case 'select': {
      output.content = (
        <Select {...registration} {...input}>
          {children}
        </Select>
      );

      break;
    }
    case 'textarea': {
      output.content = (
        <Box position="relative">
          <Textarea {...registration} {...input} />
          {output.icon}
        </Box>
      );

      break;
    }
    case 'toggle': {
      minHeight = hideAssistiveText ? 50 : 76;

      output.content = (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Toggle
              checked={is.undefined(field.value) ? false : field.value}
              disabled={disabled}
              name={name}
              onClick={handleClickToggle}
            />
          )}
          rules={{ required }}
        />
      );

      break;
    }
    case 'hidden': {
      return <input {...registration} {...input} type="hidden" />;
    }
    default: {
      let fieldValue = currentValue || '';

      if (fieldValue) {
        if (formatter === 'moneyBR') {
          fieldValue = formatMoney(fieldValue);
        } else if (formatter === 'phoneBR') {
          fieldValue = formatPhoneBR(`${fieldValue}`);
        }
      }

      output.content = (
        <Box position="relative">
          <Input {...registration} {...input} type={type} value={fieldValue} />
          {output.icon}
        </Box>
      );
    }
  }

  if (type === 'checkbox') {
    return (
      <Box data-component-name="Field" mb="md" style={style}>
        {output.content}
        <FieldDebug {...props} />
      </Box>
    );
  }

  return (
    <FormGroup
      assistiveText={assistiveText}
      data-component-name="Field"
      hideAssistiveText={hideAssistiveText}
      label={label}
      labelId={input.id}
      labelInfo={required && <Text variant="primary">*</Text>}
      labelStyles={{ alignItems: 'flex-start' }}
      minHeight={minHeight}
      {...groupProps}
      style={style}
    >
      {output.content}
      <FieldDebug {...props} />
    </FormGroup>
  );
}

Field.defaultProps = {
  label: '',
};
