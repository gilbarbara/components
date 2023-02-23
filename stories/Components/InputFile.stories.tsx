import { Meta, StoryObj } from '@storybook/react';

import { InputFile } from 'src/InputFile';

import { hideProps } from '../__helpers__';

type Story = StoryObj<typeof InputFile>;

export default {
  title: 'Components/InputFile',
  component: InputFile,
  args: {
    ...InputFile.defaultProps,
    name: 'file',
    width: 480,
  },
  argTypes: hideProps(),
} satisfies Meta<typeof InputFile>;

export const Basic: Story = {};
