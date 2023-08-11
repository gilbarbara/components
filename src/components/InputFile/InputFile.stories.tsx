import { Meta, StoryObj } from '@storybook/react';

import { hideProps } from '~/stories/__helpers__';

import { defaultProps, InputFile } from './InputFile';

type Story = StoryObj<typeof InputFile>;

export default {
  title: 'Components/InputFile',
  component: InputFile,
  args: {
    ...defaultProps,
    name: 'file',
    width: 480,
  },
  argTypes: hideProps(),
} satisfies Meta<typeof InputFile>;

export const Basic: Story = {};
