import { ComponentMeta } from '@storybook/react';
import { DatePickerInput, DatePickerInputProps } from 'src/DatePicker/Input';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/DatePickerInput',
  component: DatePickerInput,
  args: {
    borderless: false,
    large: false,
    locale: 'en',
    showRange: false,
  },
  argTypes: {
    ...hideProps(),
    onClick: disableControl(),
  },
  parameters: {
    minHeight: 350,
  },
} as ComponentMeta<typeof DatePickerInput>;

export const Basic = (props: DatePickerInputProps) => {
  return <DatePickerInput {...props} />;
};
