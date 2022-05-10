import { ComponentMeta } from '@storybook/react';
import { Select, SelectProps } from 'src/Select';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Select',
  component: Select,
  args: {
    borderless: false,
    disabled: false,
    endSpacing: false,
    filled: false,
    large: false,
    multiple: false,
    name: 'gender',
    size: 1,
    startSpacing: false,
    width: '100%',
  },
  argTypes: {
    ...hideProps(),
    width: { control: 'text' },
  },
} as ComponentMeta<typeof Select>;

export function Basic(props: SelectProps) {
  return (
    <Select {...props}>
      <option value="">Select your gender...</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Select>
  );
}
