import { Meta, StoryObj } from '@storybook/react';

import { Paragraph, Spacer } from '~';

import { sizes } from '~/modules/options';

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

export const Solid: Story = {
  args: {
    solid: true,
  },
};

export const Sizes: Story = {
  argTypes: {
    height: disableControl(),
  },
  render: props => (
    <Spacer distribution="start" gap="lg" orientation="vertical">
      {sizes.map(size => (
        <div key={size}>
          <Paragraph mb="xs" size="lg">
            {size}
          </Paragraph>
          <InputFile {...props} height={size} />
        </div>
      ))}
    </Spacer>
  ),
};
