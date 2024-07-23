import { Meta, StoryObj } from '@storybook/react';

import { Icon, Input, Select, Textarea } from '~';

import { hideProps, marginProps, PANGRAM } from '~/stories/__helpers__';

import { defaultProps, FormElementWrapper } from './FormElementWrapper';

type Story = StoryObj<typeof FormElementWrapper>;

export default {
  title: 'Forms/FormElementWrapper',
  component: FormElementWrapper,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} satisfies Meta<typeof FormElementWrapper>;

export const Basic: Story = {
  render: () => (
    <>
      <FormElementWrapper
        endContent={<Icon color="green" name="check-o" size={24} />}
        mb="xl"
        startContent={<Icon color="gray.400" name="user" size={24} />}
      >
        <Input name="A" placeholder={PANGRAM} prefixSpacing suffixSpacing />
      </FormElementWrapper>
      <FormElementWrapper
        endContent={<Icon color="red" name="close-o" size={24} />}
        mb="xl"
        startContent={<Icon color="gray.400" name="info-o" size={24} />}
      >
        <Select name="A" prefixSpacing suffixSpacing>
          <option value="">Select your gender...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </FormElementWrapper>
      <FormElementWrapper
        endContent={<Icon color="red" name="close-o" size={24} />}
        startContent={<Icon color="gray.400" name="info-o" size={24} />}
      >
        <Textarea name="A" placeholder={PANGRAM} prefixSpacing suffixSpacing />
      </FormElementWrapper>
    </>
  ),
};
