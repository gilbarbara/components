import { Meta, StoryObj } from '@storybook/react';

import { disableControl, hideProps, hideTable, spacingProps } from '~/stories/__helpers__';

import { DatePickerRange, rangeDefaultProps } from './Range';

type Story = StoryObj<typeof DatePickerRange>;

export default {
  title: 'Components/DatePicker',
  component: DatePickerRange,
  args: rangeDefaultProps,
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
