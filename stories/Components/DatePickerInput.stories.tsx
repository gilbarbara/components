import { Meta, StoryObj } from '@storybook/react';

import { DatePickerInput, inputDefaultProps } from 'src/DatePicker/Input';

import { disableControl, hideProps } from '../__helpers__';

type Story = StoryObj<typeof DatePickerInput>;

export default {
  title: 'Components/DatePicker',
  component: DatePickerInput,
  args: inputDefaultProps,
  argTypes: {
    ...hideProps(),
    currentMonthLabel: { control: 'text' },
    onSelect: disableControl(),
    width: { control: 'text' },
  },
  parameters: {
    minHeight: 450,
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DatePickerInput>;

export const Input: Story = {};
