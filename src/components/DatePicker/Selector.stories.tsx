import { Meta, StoryObj } from '@storybook/react';

import { disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { DatePickerSelector, selectorDefaultProps } from './Selector';

type Story = StoryObj<typeof DatePickerSelector>;

export default {
  title: 'Inputs/DatePicker',
  component: DatePickerSelector,
  args: {
    ...selectorDefaultProps,
    name: 'date',
  },
  argTypes: {
    ...hideProps(),
    ...marginProps(),
    currentMonthLabel: { control: 'text' },
    onChange: disableControl(),
    width: { control: 'text' },
  },
  parameters: {
    minHeight: 450,
    layout: 'fullscreen',
    paddingDocs: 'md',
  },
} satisfies Meta<typeof DatePickerSelector>;

export const Selector: Story = {};
