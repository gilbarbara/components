import { Meta } from '@storybook/react';

import { ButtonBase } from 'src/ButtonBase';

import { colorProps, hideProps, spacingProps } from '../__helpers__';

export default {
  title: 'Components/ButtonBase',
  component: ButtonBase,
  args: {
    ...ButtonBase.defaultProps,
    children: 'Button',
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(),
    ...spacingProps(),
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `A button without styling`,
      },
    },
  },
} as Meta<typeof ButtonBase>;

export const Basic = {};
