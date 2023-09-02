import { Meta, StoryObj } from '@storybook/react';

import { colorProps, hideProps } from '~/stories/__helpers__';

import { defaultProps, InputFile } from './InputFile';

type Story = StoryObj<typeof InputFile>;

export default {
  title: 'Inputs/InputFile',
  component: InputFile,
  args: {
    ...defaultProps,
    name: 'file',
    width: 480,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent']),
  },
} satisfies Meta<typeof InputFile>;

export const Basic: Story = {};
