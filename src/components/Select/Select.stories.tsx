import { Meta, StoryObj } from '@storybook/react';

import { Paragraph, Spacer } from '~';

import { sizes } from '~/modules/options';
import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';

import { defaultProps, Select } from './Select';

type Story = StoryObj<typeof Select>;

export default {
  title: 'Components/Select',
  // category: 'Inputs',
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
    <Spacer distribution="center" gap="lg" orientation="vertical">
      {sizes.map(size => (
        <div key={size}>
          <Paragraph align="center" mb="xs" size="lg">
            {size}
          </Paragraph>
          <Select {...props} height={size} width="90vw">
            {options}
          </Select>
        </div>
      ))}
    </Spacer>
  ),
};
