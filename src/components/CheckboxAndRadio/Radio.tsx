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

export const defaultProps = {
  accent: 'primary',
  align: 'center',
  borderless: false,
  disabled: false,
  size: 'md',
} satisfies Omit<RadioProps, 'name' | 'value'>;

/**
 * Use the RadioGroup component instead of this.
 * RadioGroup accepts an `items` prop that render this component in a group and is responsible for managing state and interactions.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
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

  return (
    <StyledLabel
      align={align}
      category="radio"
      data-component-name="Radio"
      disabled={disabled}
      htmlFor={id}
      {...getMarginProps(props)}
    >
      <StyledCheckboxRadioInput
        ref={ref}
        aria-checked={!!(checked ?? defaultChecked)}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        role="radio"
        type="radio"
        {...rest}
      />
      <StyledElement
        accent={accent}
        borderless={borderless}
        category="radio"
        data-component-name="RadioElement"
        label={label}
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={disabled ? -1 : 0}
      />
      {label && (
        <StyledText category="radio" size={size}>
          {label}
        </StyledText>
      )}
    </StyledLabel>
  );
});

Radio.displayName = 'Radio';

export type { RadioProps } from './utils';
