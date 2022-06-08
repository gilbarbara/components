import { ComponentMeta } from '@storybook/react';
import { DatePickerRange, DatePickerRangerProps } from 'src/DatePicker/Range';

import { disableControl, hideProps, hideTable, spacingProps } from '../__helpers__';

export default {
  title: 'Components/DatePicker',
  component: DatePickerRange,
  args: DatePickerRange.defaultProps,
  argTypes: {
    ...hideProps(),
    ...spacingProps(),
    currentMonthLabel: { control: 'text' },
    onSelect: disableControl(),
    onApply: hideTable(),
    showApply: hideTable(),
  },
} as ComponentMeta<typeof DatePickerRange>;

export const Range = (props: DatePickerRangerProps) => <DatePickerRange {...props} />;
