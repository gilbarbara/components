import { forwardRef } from 'react';

import {
  handleKeyDown,
  RadioProps,
  StyledCheckboxRadioInput,
  StyledElement,
  StyledLabel,
  StyledText,
} from './utils';

/**
 * Use the RadioGroup component instead of this.
 * RadioGroup accepts an `options` prop that render this component in a group and is responsible for managing state and interactions.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { checked, children, defaultChecked, id, label, name, size, style, ...rest } = props;

  return (
    <StyledLabel category="radio" data-component-name="Radio" htmlFor={id}>
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
        onKeyDown={handleKeyDown}
        size={size}
        style={style}
        tabIndex={props.disabled ? -1 : 0}
      />
      <StyledText category="radio" size={size}>
        {children || label}
      </StyledText>
    </StyledLabel>
  );
});

Radio.defaultProps = {
  disabled: false,
  size: 'md',
};
Radio.displayName = 'Radio';
