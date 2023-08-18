import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps, marginProps } from '~/stories/__helpers__';

import { CopyToClipboard, defaultProps } from './CopyToClipboard';

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
    ...colorProps(),
    ...marginProps(),
  },
} satisfies Meta<typeof CopyToClipboard>;

export const Basic: Story = {};
