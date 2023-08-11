import { Meta, StoryObj } from '@storybook/react';

import { disableControl, hideProps, spacingProps } from '~/stories/__helpers__';

import { DatePicker, defaultProps } from './Single';

type Story = StoryObj<typeof DatePicker>;

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: defaultProps,
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    currentMonthLabel: { control: 'text' },
    onSelect: disableControl(),
  },
} satisfies Meta<typeof DatePicker>;

export const Single: Story = {};
