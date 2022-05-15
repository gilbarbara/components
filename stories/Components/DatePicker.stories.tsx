import { ComponentMeta } from '@storybook/react';
import { DatePicker, DatePickerProps } from 'src/DatePicker/Base';

import { disableControl, hideProps } from '../__helpers__';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: {
    locale: 'en',
  },
  argTypes: {
    ...hideProps(),
    onClick: disableControl(),
    open: { control: 'boolean' },
  },
} as ComponentMeta<typeof DatePicker>;

export const Basic = (props: DatePickerProps) => <DatePicker {...props} />;
