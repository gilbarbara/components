import { Meta } from '@storybook/react';

import { Label } from 'src/Label';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/Label',
  component: Label,
  args: {
    ...Label.defaultProps,
    children: 'Far far away, behind the word mountains there live the blind texts.',
    labelInfo: '*',
  },
  argTypes: {
    ...hideProps(),
    labelInfo: { control: 'text' },
  },
} as Meta<typeof Label>;

export const Basic = {};
