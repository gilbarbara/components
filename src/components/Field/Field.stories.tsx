import { Meta, StoryObj } from '@storybook/react';

import { Form } from '~';

import { hideProps } from '~/stories/__helpers__';

import { defaultProps, Field } from './Field';

type Story = StoryObj<typeof Field>;

export default {
  title: 'Components/Field',
  component: Field,
  args: {
    ...defaultProps,
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
