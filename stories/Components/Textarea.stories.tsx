import { Meta, StoryObj } from '@storybook/react';

import { Textarea } from 'src/Textarea';

import { hideProps } from '../__helpers__';

type Story = StoryObj<typeof Textarea>;

export default {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    ...Textarea.defaultProps,
    name: 'description',
    placeholder: 'Tell us something about yourself...',
  },
  argTypes: {
    ...hideProps(),
    width: { control: 'text' },
  },
} satisfies Meta<typeof Textarea>;

export const Basic: Story = {};
