import { ComponentMeta } from '@storybook/react';
import { Form } from 'src';
import { Field, FieldProps } from 'src/Field';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Field',
  component: Field,
  args: {
    assistiveText: 'Make sure to fill out your full name',
    disabled: false,
    label: 'Name',
    name: 'name',
    placeholder: 'Your name here...',
    type: 'text',
  },
  argTypes: hideProps(),
} as ComponentMeta<typeof Field>;

export const Basic = (props: FieldProps) => <Form>{() => <Field {...props} />}</Form>;
