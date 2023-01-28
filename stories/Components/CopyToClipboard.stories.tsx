import { Meta } from '@storybook/react';

import { CopyToClipboard } from 'src/CopyToClipboard';

import { hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/CopyToClipboard',
  component: CopyToClipboard,
  args: {
    ...CopyToClipboard.defaultProps,
    text: 'test-user@example.com',
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
} as Meta<typeof CopyToClipboard>;

export const Basic = {};
