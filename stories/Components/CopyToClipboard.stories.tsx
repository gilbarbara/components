import { ComponentMeta } from '@storybook/react';
import { CopyToClipboard, CopyToClipboardProps } from 'src/CopyToClipboard';

import { hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/CopyToClipboard',
  component: CopyToClipboard,
  args: {
    disableAnimation: false,
    hoverText: 'Copy',
    icon: 'copy',
    size: 16,
    text: 'test-user@example.com',
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
} as ComponentMeta<typeof CopyToClipboard>;

export const Basic = (props: CopyToClipboardProps) => <CopyToClipboard {...props} />;
