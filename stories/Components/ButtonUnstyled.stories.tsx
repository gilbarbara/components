import { Meta } from '@storybook/react';

import { ButtonUnstyled } from 'src/ButtonUnstyled';

import { colorProps, hideProps, spacingProps, textOptionsProps } from '../__helpers__';

export default {
  title: 'Components/ButtonUnstyled',
  component: ButtonUnstyled,
  args: {
    ...ButtonUnstyled.defaultProps,
    children: 'Button',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...spacingProps(),
    ...textOptionsProps(),
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `A button without styling`,
      },
    },
  },
} as Meta<typeof ButtonUnstyled>;

export const Basic = {};
