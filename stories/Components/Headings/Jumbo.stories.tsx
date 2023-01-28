import { Meta } from '@storybook/react';

import { Jumbo } from 'src/Headings';

import { colorProps, hideProps, marginProps } from '../../__helpers__';

export default {
  title: 'Components/Headings',
  component: Jumbo,
  args: {
    ...Jumbo.defaultProps,
    align: 'center',
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...marginProps(),
  },
} as Meta<typeof Jumbo>;

export const BasicJumbo = {
  name: 'Jumbo',
};
