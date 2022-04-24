import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { CopyToClipboard } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/CopyToClipboard',
  component: CopyToClipboard,
  argTypes: {
    ...hideProps(),
    text: {
      defaultValue: 'test-user@example.com',
    },
    disableAnimation: {
      defaultValue: false,
    },
    hoverText: {
      defaultValue: 'Copy',
    },
    icon: {
      defaultValue: 'copy',
    },
    size: {
      defaultValue: 16,
    },
  },
} as ComponentMeta<typeof CopyToClipboard>;

export function Basic(props: any) {
  return <CopyToClipboard {...props} />;
}
