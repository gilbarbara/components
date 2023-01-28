import { Meta } from '@storybook/react';

import { DatePicker } from 'src/DatePicker/Single';

import { disableControl, hideProps, spacingProps } from '../__helpers__';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: DatePicker.defaultProps,
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    currentMonthLabel: { control: 'text' },
    onSelect: disableControl(),
  },
} as Meta<typeof DatePicker>;

export const Single = {};
