import { Meta, StoryObj } from '@storybook/react';

import { Icon, Input, Select, Textarea } from 'src';
import { ComponentWrapper } from 'src/ComponentWrapper';

import { hideProps, marginProps } from '../__helpers__';

type Story = StoryObj<typeof ComponentWrapper>;

export default {
  title: 'Components/ComponentWrapper',
  component: ComponentWrapper,
  args: ComponentWrapper.defaultProps,
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
        prefix={<Icon name="check-o" size={24} variant="green" />}
        suffix="toggle-square"
      >
        <Input
          name="A"
          placeholder="The quick brown fox jumps over the lazy dog"
          prefixSpacing
          suffixSpacing
        />
      </ComponentWrapper>
      <ComponentWrapper mb="xl" prefix={<Icon name="check-o" size={24} variant="red" />}>
        <Select name="A" prefixSpacing>
          <option>Select an option...</option>
        </Select>
      </ComponentWrapper>
      <ComponentWrapper prefix={<Icon name="check-o" size={24} variant="red" />} suffix="check-o">
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
