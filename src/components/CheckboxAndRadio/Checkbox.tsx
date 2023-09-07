import { forwardRef } from 'react';

import {
  CheckboxProps,
  getMarginProps,
  handleKeyDown,
  StyledCheckboxRadioInput,
  StyledElement,
  StyledLabel,
  StyledText,
} from './utils';

export const defaultProps = {
  accent: 'primary',
  align: 'center',
  borderless: false,
  disabled: false,
  size: 'md',
} satisfies Omit<CheckboxProps, 'name'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
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
  } = {
    ...defaultProps,
    ...props,
  };
  const inputId = id ?? name;

  return (
    <StyledLabel
      align={align}
      data-component-name="Checkbox"
      disabled={disabled}
      htmlFor={inputId}
      size={size}
      {...getMarginProps(props)}
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
        data-component-name="CheckboxElement"
        label={label}
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={disabled ? -1 : 0}
      />
      {label && (
        <StyledText category="checkbox" size={size}>
          {label}
        </StyledText>
      )}
    </StyledLabel>
  );
});

Checkbox.displayName = 'Checkbox';

export type { CheckboxProps } from './utils';
