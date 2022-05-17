import { ComponentMeta } from '@storybook/react';
import { Icon, Input, Select, Textarea } from 'src';
import { ComponentWrapper } from 'src/ComponentWrapper';

import { hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/ComponentWrapper',
  component: ComponentWrapper,
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
} as ComponentMeta<typeof ComponentWrapper>;

export const Basic = () => (
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
);
