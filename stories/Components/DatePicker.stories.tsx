import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { DatePicker, DatePickerRange } from '../../src';
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

export const Basic = (props: any) => {
  return <DatePicker {...props} />;
};

Basic.component = DatePicker;

export const Range = (props: any) => {
  return <DatePickerRange {...props} />;
};

Range.component = DatePickerRange;
