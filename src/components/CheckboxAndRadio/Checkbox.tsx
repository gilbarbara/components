import { forwardRef } from 'react';

import {
  CheckboxProps,
  getMarginProps,
  handleKeyDown,
  StyledCheckboxRadioInput,
  StyledElement,
  StyledLabel,
  StyledText,
  useCheckboxAndRadio,
} from './useCheckboxAndRadio';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useCheckboxAndRadio(props, 'checkbox');
  const {
    accent,
    align,
    borderless,
    checked,
    defaultChecked,
    disabled,
    id,
    label,
    name,
    size,
    style,
    ...rest
  } = componentProps;

  const inputId = id ?? name;

  return (
    <StyledLabel
      align={align}
      {...getDataAttributes('Checkbox')}
      disabled={disabled}
      htmlFor={inputId}
      size={size}
      {...getMarginProps(componentProps)}
    >
      <StyledCheckboxRadioInput
        ref={ref}
        aria-checked={checked ?? defaultChecked}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={inputId}
        name={name}
        type="checkbox"
        {...rest}
      />
      <StyledElement
        accent={accent}
        borderless={borderless}
        category="checkbox"
        {...getDataAttributes('CheckboxElement')}
        label={label}
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={disabled ? -1 : 0}
        theme={rest.theme}
      />
      {label && (
        <StyledText category="checkbox" size={size} theme={rest.theme}>
          {label}
        </StyledText>
      )}
    </StyledLabel>
  );
});

Checkbox.displayName = 'Checkbox';

export { checkBoxDefaultProps, type CheckboxProps } from './useCheckboxAndRadio';
