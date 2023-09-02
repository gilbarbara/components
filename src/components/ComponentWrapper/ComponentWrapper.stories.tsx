import { Meta, StoryObj } from '@storybook/react';

import { Icon, Input, Select, Textarea } from '~';

import { hideProps, marginProps } from '~/stories/__helpers__';

import { ComponentWrapper, defaultProps } from './ComponentWrapper';

type Story = StoryObj<typeof ComponentWrapper>;

export default {
  title: 'Layout/ComponentWrapper',
  component: ComponentWrapper,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof ComponentWrapper>;

export const Basic: Story = {
  render: () => (
    <>
      <ComponentWrapper
        mb="xl"
        prefix={<Icon color="green" name="check-o" size={24} />}
        suffix="toggle-square"
      >
        <Input
          name="A"
          placeholder="The quick brown fox jumps over the lazy dog"
          prefixSpacing
          suffixSpacing
        />
      </ComponentWrapper>
      <ComponentWrapper mb="xl" prefix={<Icon color="red" name="check-o" size={24} />}>
        <Select name="A" prefixSpacing value="">
          <option value="">Select your gender...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </ComponentWrapper>
      <ComponentWrapper prefix={<Icon color="red" name="check-o" size={24} />} suffix="check-o">
        <Textarea
          name="A"
          placeholder="The quick brown fox jumps over the lazy dog"
          prefixSpacing
          suffixSpacing
        />
      </ComponentWrapper>
    </>
  ),
};
