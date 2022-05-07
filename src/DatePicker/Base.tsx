import * as React from 'react';
import { useState } from 'react';
import Picker, { DayModifiers } from 'react-day-picker';
import styled from '@emotion/styled';
import { omit } from '@gilbarbara/helpers';
import { AnyObject } from '@gilbarbara/types';
import is from 'is-lite';

import { DatePickerBaseProps, DatePickerSingleClickHandler } from './types';
import { getStyles, locales } from './utils';

import { styledOptions } from '../modules/system';

export type DatePickerProps = DatePickerBaseProps<DatePickerSingleClickHandler>;

const StyledDatePicker = styled(
  'div',
  styledOptions,
)<DatePickerProps>(props => {
  return getStyles(props);
});

export function DatePicker(props: DatePickerProps): JSX.Element {
  const { finalDate, initialDate, locale, onClick, variant, ...rest } = props;
  const [date, setDate] = useState<Date | undefined>(undefined);

  const {
    firstDayOfWeek = 0,
    localeUtils,
    months,
    weekdaysLong,
    weekdaysShort,
  } = locale && locales[locale] ? locales[locale] : ({} as AnyObject);

  const handleClickDay = (day: Date, modifiers: DayModifiers) => {
    if (modifiers.disabled || modifiers.outside) {
      return;
    }

    let nextDate: Date | undefined = day;

    if (date && date.toISOString() === day.toISOString()) {
      nextDate = undefined;
    }

    setDate(nextDate);

    if (onClick) {
      onClick(nextDate ? day.toISOString() : '');
    }
  };

  const additionalProps: Partial<DatePickerProps> = {};
  let dateStart;
  let dateEnd;

  if (initialDate) {
    dateStart = is.date(initialDate) ? initialDate : new Date(initialDate);

    additionalProps.month = new Date(dateStart.getFullYear(), dateStart.getMonth());
    additionalProps.fromMonth = additionalProps.month;
    additionalProps.disabledDays = [
      {
        after: new Date(dateStart.getFullYear(), dateStart.getMonth(), 0),
        before: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()),
      },
    ];
  }

  if (finalDate) {
    dateEnd = is.date(finalDate) ? finalDate : new Date(finalDate);
    const disabledDays = [];

    disabledDays.push({
      after: new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate()),
      before: new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 1, 1),
    });

    if (dateStart && dateStart.getMonth() === dateEnd.getMonth()) {
      disabledDays.push({
        after: new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 1, 0),
        before: new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 2, 1),
      });
    }

    additionalProps.toMonth = new Date(dateEnd.getFullYear(), dateEnd.getMonth());

    if (is.array(additionalProps.disabledDays)) {
      additionalProps.disabledDays.push(...disabledDays);
    } else {
      additionalProps.disabledDays = disabledDays;
    }
  }

  return (
    <StyledDatePicker data-component-name="DatePicker" {...omit(props, 'onClick', 'onDayClick')}>
      <Picker
        firstDayOfWeek={firstDayOfWeek}
        locale={locale}
        localeUtils={localeUtils}
        months={months}
        onDayClick={handleClickDay}
        selectedDays={date}
        todayButton="Today"
        weekdaysLong={weekdaysLong}
        weekdaysShort={weekdaysShort}
        {...additionalProps}
        {...rest}
      />
    </StyledDatePicker>
  );
}

DatePicker.defaultProps = {
  variant: 'primary',
};
