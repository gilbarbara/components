import { Meta, StoryObj } from '@storybook/react';

import { hideProps } from '~/stories/__helpers__';

import { defaultProps, Select } from './Select';

type Story = StoryObj<typeof Select>;

export default {
  title: 'Components/Select',
  component: Select,
  args: {
    ...defaultProps,
    name: 'gender',
  },
  argTypes: {
    ...hideProps(),
    width: { control: 'text' },
  },
} satisfies Meta<typeof Select>;

export const Basic: Story = {
  render: props => (
    <Select {...props}>
      <option value="">Select your gender...</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Select>
  ),
};