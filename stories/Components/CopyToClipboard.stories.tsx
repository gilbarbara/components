import { ComponentMeta } from '@storybook/react';
import { CopyToClipboard, CopyToClipboardProps } from 'src/CopyToClipboard';

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
} as ComponentMeta<typeof CopyToClipboard>;

export const Basic = (props: CopyToClipboardProps) => <CopyToClipboard {...props} />;
