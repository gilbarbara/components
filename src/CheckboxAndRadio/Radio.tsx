import { forwardRef } from 'react';

import {
  getMarginProps,
  handleKeyDown,
  RadioProps,
  StyledCheckboxRadioInput,
  StyledElement,
  StyledLabel,
  StyledText,
} from './utils';

/**
 * Use the RadioGroup component instead of this.
 * RadioGroup accepts an `items` prop that render this component in a group and is responsible for managing state and interactions.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { align, checked, defaultChecked, id, label, name, size, style, ...rest } = props;

  return (
    <StyledLabel
      align={align}
      category="radio"
      data-component-name="Radio"
      htmlFor={id}
      {...getMarginProps(props)}
    >
      <StyledCheckboxRadioInput
        ref={ref}
        aria-checked={!!(checked || defaultChecked)}
        checked={checked}
        defaultChecked={defaultChecked}
        id={id}
        name={name}
        role="radio"
        type="radio"
        {...rest}
      />
      <StyledElement
        category="radio"
        label={label}
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={props.disabled ? -1 : 0}
      />
      {label && (
        <StyledText category="radio" size={size}>
          {label}
        </StyledText>
      )}
    </StyledLabel>
  );
});

Radio.defaultProps = {
  align: 'center',
  disabled: false,
  size: 'md',
};
