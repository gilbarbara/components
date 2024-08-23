import { Meta, StoryObj } from '@storybook/react';

import { disableControl, hideProps, marginProps } from '~/stories/__helpers__';

import { DatePickerSelector, selectorDefaultProps } from './Selector';

type Story = StoryObj<typeof DatePickerSelector>;

export default {
  title: 'Components/DatePicker',
  // category: 'Inputs',
  component: DatePickerSelector,
  args: {
    ...selectorDefaultProps,
    captionLayout: 'dropdown',
    fromYear: 1900,
    name: 'date',
    toYear: new Date().getFullYear(),
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
