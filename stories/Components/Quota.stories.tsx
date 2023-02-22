import { Meta } from '@storybook/react';

import { Quote } from 'src/Quote';

import { colorProps, hideProps, textOptionsProps } from '../__helpers__';

export default {
  title: 'Components/Quote',
  component: Quote,
  args: Quote.defaultProps,
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...textOptionsProps(),
    attribution: { control: 'text' },
    children: { control: 'text' },
  },
} as Meta<typeof Quote>;

export const Basic = {
  args: {
    attribution: 'Hommer Simpson',
    children: 'The quick brown fox jumps over the lazy dog',
  },
};
