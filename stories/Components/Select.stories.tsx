import { ComponentMeta } from '@storybook/react';

import { Select, SelectProps } from 'src/Select';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Select',
  component: Select,
  args: {
    ...Select.defaultProps,
    name: 'gender',
  },
  argTypes: {
    ...hideProps(),
    width: { control: 'text' },
  },
} as ComponentMeta<typeof Select>;

export const Basic = (props: SelectProps) => (
  <Select {...props}>
    <option value="">Select your gender...</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </Select>
);
