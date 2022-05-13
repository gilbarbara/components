import { forwardRef } from 'react';

import {
  CheckboxProps,
  handleKeyDown,
  StyledCheckboxRadioInput,
  StyledElement,
  StyledLabel,
  StyledText,
} from './utils';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { checked, children, defaultChecked, id, label, name, size, style, ...rest } = props;
  const inputId = id || name;

  return (
    <StyledLabel data-component-name="Checkbox" htmlFor={inputId} size={size}>
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
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={props.disabled ? -1 : 0}
      />
      <StyledText category="checkbox" size={size}>
        {children || label}
      </StyledText>
    </StyledLabel>
  );
});

Checkbox.defaultProps = {
  disabled: false,
  size: 'md',
};
