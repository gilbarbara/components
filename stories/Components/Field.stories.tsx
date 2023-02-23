import { Meta, StoryObj } from '@storybook/react';

import { Form } from 'src';
import { Field } from 'src/Field';

import { hideProps } from '../__helpers__';

type Story = StoryObj<typeof Field>;

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
} satisfies Meta<typeof Field>;

export const Basic: Story = {
  render: props => <Form>{() => <Field {...props} />}</Form>,
};
