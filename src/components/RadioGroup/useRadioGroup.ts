import { Simplify, StringOrNumber } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';

import { RadioProps } from '~/components/CheckboxAndRadio/useCheckboxAndRadio';

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
  borderless: false,
  disabled: false,
  inline: false,
  size: 'md',
} satisfies Omit<RadioGroupProps, 'items' | 'name' | 'value'>;

export function useRadioGroup(props: RadioGroupProps) {
  return useComponentProps(props, defaultProps);
}
