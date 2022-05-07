import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { DatePicker, DatePickerProps } from '../../src/DatePicker/Base';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    ...hideProps(),
    onClick: { action: 'onClick' },
    open: { control: 'boolean' },
  },
} as ComponentMeta<typeof DatePicker>;

export const Basic = (props: DatePickerProps) => {
  return <DatePicker {...props} />;
};
