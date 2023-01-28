import { Meta } from '@storybook/react';

import { Form } from 'src';
import { Field, FieldProps } from 'src/Field';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Field',
  component: Field,
  args: {
    ...Field.defaultProps,
    assistiveText: 'Make sure to fill out your full name',
    label: 'Name',
    name: 'name',
    placeholder: 'Your name here...',
  },
  argTypes: hideProps(),
} as Meta<typeof Field>;

export const Basic = {
  render: (props: FieldProps) => <Form>{() => <Field {...props} />}</Form>,
};
