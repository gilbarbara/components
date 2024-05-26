import { Meta, StoryObj } from '@storybook/react';

import { colorProps, disableControl, hideProps } from '~/stories/__helpers__';

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

export const Sizes: Story = {
  argTypes: {
    height: disableControl(),
  },
  render: props => (
    <>
      <InputFile {...props} height="sm" />
      <br />
      <InputFile {...props} height="md" />
      <br />
      <InputFile {...props} height="lg" />
    </>
  ),
};
