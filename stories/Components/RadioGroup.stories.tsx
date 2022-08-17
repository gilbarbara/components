import { ComponentMeta } from '@storybook/react';

import { Paragraph, Text } from 'src';
import { RadioGroup, RadioGroupProps } from 'src/RadioGroup';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    ...RadioGroup.defaultProps,
    defaultValue: 2,
    items: [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
      { label: 'Third', value: 3, disabled: true },
      {
        label: (
          <div>
            <Text size="large">Forth</Text>
            <Paragraph>Far far away, behind the word mountains.</Paragraph>
          </div>
        ),
        value: 4,
      },
    ],
    name: 'position',
  },
  argTypes: {
    ...hideProps(),
    defaultValue: { control: 'number' },
    onChange: { action: 'onChange', ...disableControl() },
    items: disableControl(),
  },
} as ComponentMeta<typeof RadioGroup>;

export const Basic = (props: RadioGroupProps) => <RadioGroup defaultValue={4} {...props} />;
