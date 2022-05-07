import { useCallback, useEffect, useState } from 'react';
import { usePrevious } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Radio, RadioProps } from './CheckboxAndRadio';
import { getTheme } from './modules/helpers';
import { getStyledOptions } from './modules/system';
import { Option, WithComponentSize } from './types';

export interface RadioGroupProps
  extends Omit<RadioProps, 'checked' | 'defaultChecked' | 'inline' | 'label'>,
    WithComponentSize {
  defaultValue?: number | string;
  inline?: boolean;
  options: Option[];
}

const StyledRadioGroup = styled(
  'div',
  getStyledOptions(),
)<Pick<RadioGroupProps, 'inline'>>(props => {
  const { inline } = props;
  const { spacing } = getTheme(props);

  return css`
    display: flex;
    flex-direction: ${inline ? 'row' : 'column'};

    ${inline &&
    css`
      margin-top: 0;

      [data-component-name='Radio'] + [data-component-name='Radio'] {
        margin-left: ${spacing.xs};
      }
    `};
  `;
});

export function RadioGroup(props: RadioGroupProps) {
  const { defaultValue, disabled, inline, name, onChange, options, size, value, ...rest } = props;
  const [selectedValue, setSelectedValue] = useState(value ?? defaultValue);
  const previousProps = usePrevious(props);

  useEffect(() => {
    if (previousProps && value && previousProps.value !== value) {
      setSelectedValue(value);
    }
  }, [previousProps, value]);

  const handleChange = useCallback(
    ({ target }) => {
      const numericValue = Number(target.value);
      const currentValue = !Number.isNaN(numericValue) ? numericValue : target.value;

      /* istanbul ignore else */
      if (onChange) {
        onChange(currentValue);
      }

      if (!value && !disabled) {
        setSelectedValue(currentValue);
      }
    },
    [disabled, onChange, value],
  );

  if (!options || !options.length) {
    return null;
  }

  const currentValue = !!value && value !== selectedValue ? value : selectedValue;

  return (
    <StyledRadioGroup inline={inline} {...rest} data-component-name="RadioGroup" role="radiogroup">
      {options.map(d => (
        <Radio
          key={d.value}
          checked={d.value === currentValue}
          disabled={disabled || d.disabled}
          label={d.label || d.value}
          name={name}
          onChange={handleChange}
          size={size}
          type="radio"
          value={d.value}
        />
      ))}
    </StyledRadioGroup>
  );
}

RadioGroup.defaultProps = {
  size: 'md',
};
