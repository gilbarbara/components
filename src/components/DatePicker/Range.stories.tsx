import { Meta, StoryObj } from '@storybook/react';

import {
  disableControl,
  hideProps,
  hideTable,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';

import { DatePickerRange, rangeDefaultProps } from './Range';

type Story = StoryObj<typeof DatePickerRange>;

export default {
  title: 'Inputs/DatePicker',
  component: DatePickerRange,
  args: rangeDefaultProps,
  argTypes: {
    ...hideProps(),
    ...radiusProps(),
    ...spacingProps(),
    currentMonthLabel: { control: 'text' },
    onApply: hideTable(),
    onChange: disableControl(),
    showApply: hideTable(),
  },
} satisfies Meta<typeof DatePickerRange>;

export const Range: Story = {};
