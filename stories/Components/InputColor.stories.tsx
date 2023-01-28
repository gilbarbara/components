import { Meta } from '@storybook/react';

import { InputColor } from 'src/InputColor';

import { hideProps } from '../__helpers__';

export default {
  title: 'Components/InputColor',
  component: InputColor,
  args: {
    ...InputColor.defaultProps,
    name: 'color',
  },
  argTypes: {
    ...hideProps(),
    height: { control: 'text' },
    width: { control: 'text' },
  },
} as Meta<typeof InputColor>;

export const Basic = {};
