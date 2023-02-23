import { Meta, StoryObj } from '@storybook/react';

import { DatePickerRange } from 'src/DatePicker/Range';

import { disableControl, hideProps, hideTable, spacingProps } from '../__helpers__';

type Story = StoryObj<typeof DatePickerRange>;

export default {
  title: 'Components/DatePicker',
  component: DatePickerRange,
  args: DatePickerRange.defaultProps,
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    currentMonthLabel: { control: 'text' },
    onSelect: disableControl(),
    onApply: hideTable(),
    showApply: hideTable(),
  },
} satisfies Meta<typeof DatePickerRange>;

export const Range: Story = {};
