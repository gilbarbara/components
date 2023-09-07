import { Meta, StoryObj } from '@storybook/react';

import { Spacer } from '~';

import { colorProps, disableControl, hideProps, textOptionsProps } from '~/stories/__helpers__';

import { defaultProps, Quote } from './Quote';

type Story = StoryObj<typeof Quote>;

export default {
  title: 'Content/Quote',
  component: Quote,
  args: {
    ...defaultProps,
    attribution: 'Homer Simpson',
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    ...textOptionsProps(),
    attribution: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Quote>;

export const Basic: Story = {};

export const BorderPosition: Story = {
  argTypes: {
    border: disableControl(),
  },
  render: props => (
    <Spacer gap="xl" gapVertical="xl">
      <Quote {...props} attribution="top" border="top" />
      <Quote {...props} attribution="right" border="right" />
      <Quote {...props} attribution="bottom" border="bottom" />
      <Quote {...props} attribution="left" border="left" />
    </Spacer>
  ),
};

export const BorderSize: Story = {
  argTypes: {
    borderSize: disableControl(),
  },
  render: props => (
    <Spacer gap="xl" gapVertical="xl">
      <Quote {...props} attribution="sm" borderSize="sm" />
      <Quote {...props} attribution="md" borderSize="md" />
      <Quote {...props} attribution="lg" borderSize="lg" />
    </Spacer>
  ),
};
