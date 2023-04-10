import { Meta, StoryObj } from '@storybook/react';

import { CopyToClipboard, defaultProps } from 'src/CopyToClipboard';

import { hideProps, marginProps } from '../__helpers__';

type Story = StoryObj<typeof CopyToClipboard>;

export default {
  title: 'Components/CopyToClipboard',
  component: CopyToClipboard,
  args: {
    ...defaultProps,
    text: 'test-user@example.com',
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
} satisfies Meta<typeof CopyToClipboard>;

export const Basic: Story = {};
