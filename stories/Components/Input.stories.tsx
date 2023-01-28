import { Meta } from '@storybook/react';

import { Input, InputProps } from 'src/Input';
import { inputTypes } from 'src/modules/options';

import { disableControl, hideProps } from '../__helpers__';

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
} as Meta<typeof Input>;

export const Basic = {};

export const Variants = {
  args: {
    placeholder: '',
  },
  argTypes: {
    borderless: disableControl(),
    disabled: disableControl(),
    name: disableControl(),
  },
  render: (props: InputProps) => (
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
