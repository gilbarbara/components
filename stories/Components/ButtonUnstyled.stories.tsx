import { Meta, StoryObj } from '@storybook/react';

import { ButtonUnstyled } from 'src/ButtonUnstyled';

import { colorProps, hideProps, spacingProps, textOptionsProps } from '../__helpers__';

type Story = StoryObj<typeof ButtonUnstyled>;

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
} satisfies Meta<typeof ButtonUnstyled>;

export const Basic: Story = {};
