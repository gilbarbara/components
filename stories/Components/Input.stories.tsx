import { ComponentMeta } from '@storybook/react';
import { Input, InputProps } from 'src/Input';

import { inputTypes } from 'src/modules/options';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/Input',
  component: Input,
  args: {
    borderless: false,
    disabled: false,
    large: false,
    name: 'name',
    placeholder: 'Your name here...',
    prefixSpacing: false,
    readOnly: false,
    suffixSpacing: false,
    type: 'text',
    width: '100%',
  },
  argTypes: {
    ...hideProps(),
    type: { control: 'select', options: inputTypes },
    width: { control: 'text' },
  },
} as ComponentMeta<typeof Input>;

export const Basic = (props: InputProps) => <Input {...props} />;

export const Variants = (props: InputProps) => (
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
);

Variants.args = {
  placeholder: '',
};

Variants.argTypes = {
  borderless: disableControl(),
  disabled: disableControl(),
  name: disableControl(),
};
