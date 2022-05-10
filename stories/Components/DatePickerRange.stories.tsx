import { ComponentMeta } from '@storybook/react';
import { DatePickerRange, DatePickerRangerProps } from 'src/DatePicker/Range';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/DatePickerRange',
  component: DatePickerRange,
  argTypes: {
    ...hideProps(),
    onClick: disableControl(),
    open: { control: 'boolean' },
  },
} as ComponentMeta<typeof DatePickerRange>;

export const Basic = (props: DatePickerRangerProps) => {
  return <DatePickerRange {...props} />;
};
