import { Meta, StoryObj } from '@storybook/react';

import { Paragraph, Text } from '~';

import { disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { defaultProps, RadioGroup } from './RadioGroup';

type Story = StoryObj<typeof RadioGroup>;

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    ...defaultProps,
    defaultValue: 4,
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
    ...marginProps(),
    defaultValue: { control: 'number' },
    onChange: { action: 'onChange', ...disableControl() },
    items: disableControl(),
  },
} satisfies Meta<typeof RadioGroup>;

export const Basic: Story = {};