import { ComponentMeta } from '@storybook/react';

import { DatePicker, DatePickerSingleProps } from 'src/DatePicker/Single';

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
} as ComponentMeta<typeof DatePicker>;

export const Single = (props: DatePickerSingleProps) => <DatePicker {...props} />;
