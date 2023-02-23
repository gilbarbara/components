import { Meta, StoryObj } from '@storybook/react';

import { Input } from 'src/Input';
import { inputTypes } from 'src/modules/options';

import { disableControl, hideProps } from '../__helpers__';

type Story = StoryObj<typeof Input>;

export default {
  title: 'Components/Input',
  component: Input,
  args: {
    ...Input.defaultProps,
    name: 'name',
    placeholder: 'Your name here...',
  },
  argTypes: {
    ...hideProps(),
    type: { control: 'select', options: inputTypes },
    width: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export const Basic: Story = {};

export const Variants: Story = {
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
