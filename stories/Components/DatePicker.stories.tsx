import { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from 'src/DatePicker/Single';

import { disableControl, hideProps, spacingProps } from '../__helpers__';

type Story = StoryObj<typeof DatePicker>;

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: DatePicker.defaultProps,
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    currentMonthLabel: { control: 'text' },
    onSelect: disableControl(),
  },
} satisfies Meta<typeof DatePicker>;

export const Single: Story = {};
