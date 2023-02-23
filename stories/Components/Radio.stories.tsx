import { Meta, StoryObj } from '@storybook/react';

import { Radio } from 'src/CheckboxAndRadio';

import { disableControl, hideProps, marginProps } from '../__helpers__';

type Story = StoryObj<typeof Radio>;

export default {
  title: 'Components/Radio',
  component: Radio,
  args: {
    ...Radio.defaultProps,
    label: 'Skip Packaging',
    name: 'skipPackaging',
    value: 'skipPackaging',
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    label: { control: 'text' },
    onChange: { action: 'onChange', ...disableControl() },
    value: { control: 'text' },
  },
} satisfies Meta<typeof Radio>;

export const Basic: Story = {};
