import { useState } from 'react';
import { DayPicker, DayPickerSingleProps, SelectSingleEventHandler } from 'react-day-picker';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';

import { getStyledOptions } from '~/modules/system';

import { DatePickerSingleProps } from './types';
import { defaultProps, getFooter, getRange, getStyles } from './utils';

const StyledDatePicker = styled(
  'div',
  getStyledOptions(),
)<DatePickerSingleProps>(props => {
  return getStyles(props);
});

export const singleDefaultProps = {
  ...defaultProps,
  readOnly: false,
} satisfies DatePickerSingleProps;

export function DatePicker(props: DatePickerSingleProps) {
  const { currentMonthLabel, fromDate, month, onChange, readOnly, selected, toDate, ...rest } = {
    ...defaultProps,
    ...props,
  };
  const [selectedDate, setSelectedDate] = useState<string | undefined>(selected);
  const selectedDateObject = selectedDate ? new Date(selectedDate) : undefined;
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(month ?? selectedDateObject);

  const handleSelect: SelectSingleEventHandler = (_day, selectedDay, modifiers) => {
    if (modifiers.disabled || modifiers.outside) {
      return;
    }

    let nextDate: string | undefined = selectedDay.toISOString();

    if (selectedDate && selectedDate === selectedDay.toISOString()) {
      nextDate = undefined;
    }

    setSelectedDate(nextDate);

    onChange?.(nextDate ? selectedDay.toISOString() : '');
  };

  return (
    <StyledDatePicker
      data-component-name="DatePicker"
      {...omit(props, 'hidden', 'onDayClick', 'onChange')}
    >
      <DayPicker
        footer={getFooter(setSelectedMonth, currentMonthLabel)}
        mode={readOnly ? undefined : 'single'}
        month={selectedMonth}
        onMonthChange={setSelectedMonth}
        onSelect={handleSelect}
        selected={selectedDateObject}
        {...getRange<DayPickerSingleProps>(fromDate, toDate)}
        {...rest}
      />
    </StyledDatePicker>
  );
}

DatePicker.displayName = 'DatePicker';
