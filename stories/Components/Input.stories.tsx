import { ComponentMeta } from '@storybook/react';
import { Input, InputProps } from 'src/Input';

import { inputTypes } from 'src/modules/options';

import { hideProps, hideTable } from '../__helpers__';

export default {
  title: 'Components/Input',
  component: Input,
  args: {
    borderless: false,
    disabled: false,
    endSpacing: false,
    large: false,
    name: 'name',
    placeholder: 'Your name here...',
    readOnly: false,
    startSpacing: false,
    type: 'text',
    width: '100%',
  },
  argTypes: {
    ...hideProps(),
    type: { control: 'select', options: inputTypes },
  },
} as ComponentMeta<typeof Input>;

export function Basic(props: InputProps) {
  return <Input {...props} />;
}

export function Variants(props: InputProps) {
  return (
    <>
      <Input {...props} name="normal" />
      <br />
      <Input {...props} disabled name="normal-disabled" />
      <br />
      <Input {...props} borderless name="borderless" />
      <br />
      <Input {...props} borderless disabled name="borderless-disabled" />
      <br />
    </>
  );
}

Variants.argTypes = {
  borderless: hideTable(),
  disabled: hideTable(),
  name: hideTable(),
};
