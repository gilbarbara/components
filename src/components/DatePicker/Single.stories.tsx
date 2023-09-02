import { Meta, StoryObj } from '@storybook/react';

import { disableControl, hideProps, radiusProps, spacingProps } from '~/stories/__helpers__';

import { DatePicker, singleDefaultProps } from './Single';

type Story = StoryObj<typeof DatePicker>;

export default {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  args: {
    ...singleDefaultProps,
    captionLayout: 'dropdown-buttons',
    fromYear: 1900,
    toYear: new Date().getFullYear(),
  },
  argTypes: {
    ...hideProps(),
    ...radiusProps(),
    ...spacingProps(),
    currentMonthLabel: { control: 'text' },
    onChange: disableControl(),
  },
  parameters: {
    docs: {
      description: {
        component: `
A wrapper around the "react-day-picker" library.<br />
For more information, see the <a href="https://react-day-picker.js.org/" target="_blank">react-day-picker documentation</a>.`,
      },
    },
  },
} satisfies Meta<typeof DatePicker>;

export const Single: Story = {};
