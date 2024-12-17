import { Meta, StoryObj } from '@storybook/react';

import {
  disableControl,
  hideProps,
  hideTable,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';

import { DatePickerRange, defaultProps } from './Range';

type Story = StoryObj<typeof DatePickerRange>;

export default {
  title: 'Components/DatePicker',
  // category: 'Inputs',
  component: DatePickerRange,
  args: defaultProps,
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
