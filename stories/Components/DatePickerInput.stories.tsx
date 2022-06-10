import { ComponentMeta } from '@storybook/react';
import { DatePickerInput, DatePickerInputProps } from 'src/DatePicker/Input';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/DatePicker',
  component: DatePickerInput,
  args: DatePickerInput.defaultProps,
  argTypes: {
    ...hideProps(),
    currentMonthLabel: { control: 'text' },
    onSelect: disableControl(),
    width: { control: 'text' },
  },
  parameters: {
    minHeight: 450,
  },
} as ComponentMeta<typeof DatePickerInput>;

export const Input = (props: DatePickerInputProps) => <DatePickerInput {...props} />;
