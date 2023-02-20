import { Meta } from '@storybook/react';

import { Label } from 'src/Label';

import { hideProps, textOptionsProps } from '../__helpers__';

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
    ...textOptionsProps(),
    labelInfo: { control: 'text' },
  },
} as Meta<typeof Label>;

export const Basic = {};
