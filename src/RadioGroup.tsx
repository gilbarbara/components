import { useCallback, useEffect, useState } from 'react';
import { usePrevious } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StringOrNumber } from '@gilbarbara/types';

import { Radio, RadioProps } from './CheckboxAndRadio';
import { getTheme } from './modules/helpers';
import { getStyledOptions } from './modules/system';
import { RadioItem, WithComponentSize } from './types';

export interface RadioGroupProps
  extends WithComponentSize,
    Omit<RadioProps, 'align' | 'checked' | 'defaultChecked' | 'label'> {
  defaultValue?: StringOrNumber;
  inline?: boolean;
  items: RadioItem[];
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
  const { defaultValue, disabled, inline, items, name, onChange, size, value, ...rest } = props;
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

  if (!items || !items.length) {
    return null;
  }

  const currentValue = !!value && value !== selectedValue ? value : selectedValue;

  return (
    <StyledRadioGroup inline={inline} {...rest} data-component-name="RadioGroup" role="radiogroup">
      {items.map(d => (
        <Radio
          key={d.value}
          align="start"
          checked={d.value === currentValue}
          disabled={disabled || d.disabled}
          label={d.label || d.value}
          mb="xxs"
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
  disabled: false,
  inline: false,
  size: 'md',
};
