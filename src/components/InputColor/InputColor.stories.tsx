import { Meta, StoryObj } from '@storybook/react';

import { Paragraph, Spacer } from '~';

import { sizes } from '~/modules/options';
import { disableControl, hideProps } from '~/stories/__helpers__';

import { defaultProps, InputColor } from './InputColor';

type Story = StoryObj<typeof InputColor>;

export default {
  title: 'Components/InputColor',
  // category: 'Inputs',
  component: InputColor,
  args: {
    ...defaultProps,
    name: 'color',
  },
  argTypes: {
    ...hideProps(),
    height: { control: 'text' },
    width: { control: 'text' },
  },
} satisfies Meta<typeof InputColor>;

export const Basic: Story = {};

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
          <InputColor {...props} height={size} />
        </div>
      ))}
    </Spacer>
  ),
};
