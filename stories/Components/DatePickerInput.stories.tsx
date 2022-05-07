import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { DatePickerInput, DatePickerInputProps } from '../../src/DatePicker/Input';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/DatePickerInput',
  component: DatePickerInput,
  argTypes: {
    ...hideProps(),
    locale: { control: 'text' },
    onClick: { action: 'onClick' },
  },
  parameters: {
    minHeight: 350,
  },
} as ComponentMeta<typeof DatePickerInput>;

export const Basic = (props: DatePickerInputProps) => {
  return <DatePickerInput {...props} />;
};
