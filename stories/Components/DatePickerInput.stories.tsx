import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { DatePickerInput } from '../../src';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/DatePicker',
  component: DatePickerInput,
  argTypes: {
    ...hideProps(),
    locale: { control: 'text' },
    onClick: { action: 'onClick' },
  },
} as ComponentMeta<typeof DatePickerInput>;

export const Input = (props: any) => {
  return <DatePickerInput {...props} />;
};
