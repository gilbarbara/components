import { forwardRef } from 'react';

import {
  getMarginProps,
  handleKeyDown,
  RadioProps,
  StyledCheckboxRadioInput,
  StyledElement,
  StyledLabel,
  StyledText,
  useCheckboxAndRadio,
} from './useCheckboxAndRadio';

/**
 * Use the RadioGroup component instead of this.
 * RadioGroup accepts an `items` prop that render this component in a group and is responsible for managing state and interactions.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useCheckboxAndRadio(props, 'radio');
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

  return (
    <StyledLabel
      align={align}
      category="radio"
      {...getDataAttributes('Radio')}
      disabled={disabled}
      htmlFor={id}
      {...getMarginProps(componentProps)}
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
        {...getDataAttributes('RadioElement')}
        label={label}
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={disabled ? -1 : 0}
        theme={rest.theme}
      />
      {label && (
        <StyledText category="radio" size={size} theme={rest.theme}>
          {label}
        </StyledText>
      )}
    </StyledLabel>
  );
});

Radio.displayName = 'Radio';

export { radioDefaultProps, type RadioProps } from './useCheckboxAndRadio';
