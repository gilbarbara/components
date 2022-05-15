import { ComponentMeta } from '@storybook/react';
import { Input, Select, Textarea } from 'src';
import { IconWrapper } from 'src/IconWrapper';

import { hideProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/IconWrapper',
  component: IconWrapper,
  argTypes: {
    ...hideProps(),
    ...marginProps(),
  },
} as ComponentMeta<typeof IconWrapper>;

export const Basic = () => (
  <>
    <IconWrapper
      mb="xl"
      prefixIcon={{
        name: 'check-o',
        size: 24,
        variant: 'red',
      }}
      suffixIcon="check-o"
    >
      <Input
        name="A"
        placeholder="The quick brown fox jumps over the lazy dog"
        prefixSpacing
        suffixSpacing
      />
    </IconWrapper>
    <IconWrapper
      mb="xl"
      prefixIcon={{
        name: 'check-o',
        size: 24,
        variant: 'red',
      }}
    >
      <Select name="A" prefixSpacing>
        <option>Select an option...</option>
      </Select>
    </IconWrapper>
    <IconWrapper
      prefixIcon={{
        name: 'check-o',
        size: 24,
        variant: 'red',
      }}
      suffixIcon="check-o"
    >
      <Textarea
        name="A"
        placeholder="The quick brown fox jumps over the lazy dog"
        prefixSpacing
        suffixSpacing
      />
    </IconWrapper>
  </>
);
