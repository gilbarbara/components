import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { DatePickerRange, DatePickerRangerProps } from '../../src/DatePicker/Range';
import { hideProps } from '../__helpers__';

export default {
  title: 'Components/DatePickerRange',
  component: DatePickerRange,
  argTypes: {
    ...hideProps(),
    onClick: { action: 'onClick' },
    open: { control: 'boolean' },
  },
} as ComponentMeta<typeof DatePickerRange>;

export const Basic = (props: DatePickerRangerProps) => {
  return <DatePickerRange {...props} />;
};
