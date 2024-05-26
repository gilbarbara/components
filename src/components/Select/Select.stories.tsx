import { Meta, StoryObj } from '@storybook/react';

import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';

import { defaultProps, Select } from './Select';

type Story = StoryObj<typeof Select>;

export default {
  title: 'Inputs/Select',
  component: Select,
  args: {
    ...defaultProps,
    name: 'gender',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    width: { control: 'text' },
  },
} satisfies Meta<typeof Select>;

const options = (
  <>
    <option value="">Select your gender...</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </>
);

export const Basic: Story = {
  render: props => <Select {...props}>{options}</Select>,
};

export const Sizes: Story = {
  argTypes: {
    height: disableControl(),
  },
  render: props => (
    <>
      <Select {...props} height="sm">
        {options}
      </Select>
      <br />
      <Select {...props} height="md">
        {options}
      </Select>
      <br />
      <Select {...props} height="lg">
        {options}
      </Select>
    </>
  ),
};
