import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps } from '~/stories/__helpers__';

import { defaultProps, Textarea } from './Textarea';

type Story = StoryObj<typeof Textarea>;

export default {
  title: 'Inputs/Textarea',
  component: Textarea,
  args: {
    ...defaultProps,
    name: 'description',
    placeholder: 'Tell us something about yourself...',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
    width: { control: 'text' },
  },
} satisfies Meta<typeof Textarea>;

export const Basic: Story = {};
