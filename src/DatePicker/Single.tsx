import { useState } from 'react';
import { DayPicker, DayPickerSingleProps, SelectSingleEventHandler } from 'react-day-picker';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';

import { DatePickerSingleProps } from './types';
import { defaultProps, getFooter, getRange, getStyles } from './utils';

import { getStyledOptions } from '../modules/system';

const StyledDatePicker = styled(
  'div',
  getStyledOptions(),
)<DatePickerSingleProps>(props => {
  return getStyles(props);
});

export function DatePicker(props: DatePickerSingleProps) {
  const { currentMonthLabel, fromDate, onSelect, toDate, variant, ...rest } = {
    ...defaultProps,
    ...props,
  };
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState<Date | undefined>(undefined);

  const handleSelect: SelectSingleEventHandler = (_day, selectedDay, modifiers) => {
    if (modifiers.disabled || modifiers.outside) {
      return;
    }

    let nextDate: Date | undefined = selectedDay;

    if (selected && selected.toISOString() === selectedDay.toISOString()) {
      nextDate = undefined;
    }

    setSelected(nextDate);

    if (onSelect) {
      onSelect(nextDate ? selectedDay.toISOString() : '');
    }
  };

  return (
    <StyledDatePicker
      data-component-name="DatePicker"
      {...omit(props, 'hidden', 'onDayClick', 'onSelect')}
    >
      <DayPicker
        footer={getFooter(setMonth, currentMonthLabel)}
        mode="single"
        month={month}
        onMonthChange={setMonth}
        onSelect={handleSelect}
        selected={selected}
        {...getRange<DayPickerSingleProps>(fromDate, toDate)}
        {...rest}
      />
    </StyledDatePicker>
  );
}

export { defaultProps } from './utils';
