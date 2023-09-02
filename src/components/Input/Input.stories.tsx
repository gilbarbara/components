import { Meta, StoryObj } from '@storybook/react';

import { inputTypes } from '~/modules/options';

import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';

import { defaultProps, Input } from './Input';

type Story = StoryObj<typeof Input>;

export default {
  title: 'Inputs/Input',
  component: Input,
  args: {
    ...defaultProps,
    name: 'name',
    placeholder: 'Your name here...',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    type: { control: 'select', options: inputTypes },
    width: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export const Basic: Story = {};

export const Types: Story = {
  args: {
    placeholder: '',
  },
  argTypes: {
    borderless: disableControl(),
    disabled: disableControl(),
    name: disableControl(),
  },
  render: props => (
    <>
      <Input {...props} name="normal" placeholder="normal" />
      <br />
      <Input {...props} disabled name="normal-disabled" placeholder="normal (disabled)" />
      <br />
      <Input {...props} borderless name="borderless" placeholder="borderless" />
      <br />
      <Input
        {...props}
        borderless
        disabled
        name="borderless-disabled"
        placeholder="borderless (disabled)"
      />
      <br />
    </>
  ),
};
