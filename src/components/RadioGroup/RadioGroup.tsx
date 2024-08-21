import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { usePrevious } from '@gilbarbara/hooks';

import { getStyledOptions, getStyles } from '~/modules/system';

import { Radio } from '~/components/CheckboxAndRadio';

import { WithTheme } from '~/types';

import { RadioGroupProps, useRadioGroup } from './useRadioGroup';

const StyledRadioGroup = styled(
  'div',
  getStyledOptions(),
)<Pick<RadioGroupProps, 'inline'> & WithTheme>(props => {
  const { inline, theme } = props;
  const { dataAttributeName, spacing } = theme;

  return css`
    display: flex;
    flex-direction: ${inline ? 'row' : 'column'};
    ${getStyles(props)};

    ${inline &&
    css`
      margin-top: 0;

      [data-${dataAttributeName}='Radio'] + [data-${dataAttributeName}='Radio'] {
        margin-left: ${spacing.xs};
      }
    `};
  `;
});

export function RadioGroup(props: RadioGroupProps) {
  const { componentProps, getDataAttributes } = useRadioGroup(props);
  const {
    accent,
    borderless,
    defaultValue,
    disabled,
    inline,
    items,
    name,
    onChange,
    size,
    value,
    ...rest
  } = componentProps;
  const [selectedValue, setSelectedValue] = useState(value ?? defaultValue);
  const previousProps = usePrevious(props);

  useEffect(() => {
    if (previousProps && value && previousProps.value !== value) {
      setSelectedValue(value);
    }
  }, [previousProps, value]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const numericValue = Number(target.value);
      const currentValue = !Number.isNaN(numericValue) ? numericValue : target.value;

      onChange?.(event);

      if (!value && !disabled) {
        setSelectedValue(currentValue);
      }
    },
    [disabled, onChange, value],
  );

  if (!items?.length) {
    return null;
  }

  const currentValue = !!value && value !== selectedValue ? value : selectedValue;

  return (
    <StyledRadioGroup
      {...getDataAttributes('RadioGroup')}
      inline={inline}
      role="radiogroup"
      {...rest}
    >
      {items.map(item => (
        <Radio
          key={item.value}
          accent={item.accent ?? accent}
          align="start"
          borderless={borderless}
          checked={item.value === currentValue}
          disabled={disabled || item.disabled}
          label={item.label ?? item.value}
          mb="xxs"
          name={name}
          onChange={handleChange}
          size={size}
          type="radio"
          value={item.value}
        />
      ))}
    </StyledRadioGroup>
  );
}

RadioGroup.displayName = 'RadioGroup';

export { defaultProps, type RadioGroupProps } from './useRadioGroup';
