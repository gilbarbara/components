import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Field, Form } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Field',
  component: Field,
  argTypes: {
    ...hideProps(),
    assistiveText: { control: 'text', defaultValue: 'Make sure to fill out your full name' },
    disabled: { control: 'boolean', defaultValue: false },
    label: { control: 'text', defaultValue: 'Name' },
    name: { control: 'text', defaultValue: 'name' },
    placeholder: { control: 'text', defaultValue: 'Your name here...' },
    type: { defaultValue: 'text' },
    width: { control: 'text', defaultValue: '100%' },
  },
} as ComponentMeta<typeof Field>;

export function Basic(props: any) {
  return <Form>{() => <Field {...props} />}</Form>;
}
