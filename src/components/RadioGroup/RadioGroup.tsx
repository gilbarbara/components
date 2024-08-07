import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps } from '@gilbarbara/helpers';
import { usePrevious } from '@gilbarbara/hooks';
import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';
import { getStyledOptions, marginStyles } from '~/modules/system';

import { Radio } from '~/components/CheckboxAndRadio';
import { RadioProps } from '~/components/CheckboxAndRadio/utils';

import { RadioItem, WithComponentSize } from '~/types';

export interface RadioGroupKnownProps
  extends WithComponentSize,
    Omit<RadioProps, 'align' | 'checked' | 'defaultChecked' | 'label'> {
  defaultValue?: StringOrNumber;
  inline?: boolean;
  items: RadioItem[];
}

export type RadioGroupProps = Simplify<RadioGroupKnownProps>;

export const defaultProps = {
  accent: 'primary',
  disabled: false,
  inline: false,
  size: 'md',
} satisfies Omit<RadioGroupProps, 'items' | 'name' | 'value'>;

const StyledRadioGroup = styled(
  'div',
  getStyledOptions(),
)<Pick<RadioGroupProps, 'inline'>>(props => {
  const { inline } = props;
  const { dataAttributeName, spacing } = getTheme(props);

  return css`
    display: flex;
    flex-direction: ${inline ? 'row' : 'column'};
    ${marginStyles(props)};

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
  const { accent, defaultValue, disabled, inline, items, name, onChange, size, value, ...rest } =
    mergeProps(defaultProps, props);
  const [selectedValue, setSelectedValue] = useState(value ?? defaultValue);
  const previousProps = usePrevious(props);
  const { getDataAttributes } = useTheme();

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
      inline={inline}
      {...rest}
      {...getDataAttributes('RadioGroup')}
      role="radiogroup"
    >
      {items.map(item => (
        <Radio
          key={item.value}
          accent={item.accent ?? accent}
          align="start"
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
