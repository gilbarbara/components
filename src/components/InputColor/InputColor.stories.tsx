import { Meta, StoryObj } from '@storybook/react';

import { disableControl, hideProps } from '~/stories/__helpers__';

import { defaultProps, InputColor } from './InputColor';

type Story = StoryObj<typeof InputColor>;

export default {
  title: 'Inputs/InputColor',
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
    <>
      <InputColor {...props} height="sm" />
      <br />
      <InputColor {...props} height="md" />
      <br />
      <InputColor {...props} height="lg" />
    </>
  ),
};
