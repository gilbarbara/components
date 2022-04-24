import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Emoji } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Emoji',
  component: Emoji,
  argTypes: {
    ...hideProps(),
    label: { defaultValue: 'Unicorn' },
    symbol: { defaultValue: '🦄' },
    size: { defaultValue: 64 },
  },
} as ComponentMeta<typeof Emoji>;

export const Basic = (props: any) => {
  return <Emoji {...props} />;
};
