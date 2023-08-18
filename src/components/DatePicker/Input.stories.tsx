import { Meta, StoryObj } from '@storybook/react';

import { disableControl, hideProps } from '~/stories/__helpers__';

import { DatePickerInput, inputDefaultProps } from './Input';

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
    paddingDocs: 'md',
  },
} satisfies Meta<typeof DatePickerInput>;

export const Input: Story = {};
