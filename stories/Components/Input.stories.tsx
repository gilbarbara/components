import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Input } from '../../src';
import { hideProps, hideTable } from '../__helpers__';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    ...hideProps(),
    bigger: { defaultValue: false },
    borderless: { defaultValue: false },
    disabled: { control: 'boolean', defaultValue: false },
    endSpacing: { defaultValue: false },
    name: { control: 'text', defaultValue: 'name' },
    placeholder: { control: 'text', defaultValue: 'Your name here...' },
    readOnly: { control: 'boolean', defaultValue: false },
    startSpacing: { defaultValue: false },
    type: { defaultValue: 'text' },
    width: { control: 'text', defaultValue: '100%' },
  },
} as ComponentMeta<typeof Input>;

export function Basic(props: any) {
  return <Input {...props} />;
}

export function Variants(props: any) {
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
