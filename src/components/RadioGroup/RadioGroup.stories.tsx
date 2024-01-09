import { Meta, StoryObj } from '@storybook/react';

import { Paragraph, Text } from '~';

import { colorProps, disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { defaultProps, RadioGroup } from './RadioGroup';

type Story = StoryObj<typeof RadioGroup>;

export default {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  args: {
    ...defaultProps,
    defaultValue: 4,
    items: [
      { accent: 'red', label: 'First', value: 1 },
      { label: 'Second', value: 2 },
      { label: 'Third', value: 3, disabled: true },
      {
        label: (
          <div>
            <Text size="lg">Forth</Text>
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
    ...colorProps(['accent']),
    ...marginProps(),
    defaultValue: { control: 'number' },
    onChange: { action: 'onChange', ...disableControl() },
    items: disableControl(),
  },
} satisfies Meta<typeof RadioGroup>;

export const Basic: Story = {};
