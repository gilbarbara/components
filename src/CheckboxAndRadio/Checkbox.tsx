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

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { align, checked, defaultChecked, id, label, name, size, style, ...rest } = props;
  const inputId = id || name;

  return (
    <StyledLabel
      align={align}
      data-component-name="Checkbox"
      htmlFor={inputId}
      size={size}
      {...getMarginProps(props)}
    >
      <StyledCheckboxRadioInput
        ref={ref}
        aria-checked={checked || defaultChecked}
        checked={checked}
        defaultChecked={defaultChecked}
        id={inputId}
        name={name}
        role="checkbox"
        type="checkbox"
        {...rest}
      />
      <StyledElement
        category="checkbox"
        label={label}
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={props.disabled ? -1 : 0}
      />
      {label && (
        <StyledText category="checkbox" size={size}>
          {label}
        </StyledText>
      )}
    </StyledLabel>
  );
});

Checkbox.defaultProps = {
  align: 'center',
  disabled: false,
  size: 'md',
};
