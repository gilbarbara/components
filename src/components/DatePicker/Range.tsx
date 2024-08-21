import { ReactNode, useState } from 'react';
import { DayPicker, DayPickerRangeProps, SelectRangeEventHandler } from 'react-day-picker';
import styled from '@emotion/styled';
import { formatDateLocale, omit } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';

import { getStyledOptions } from '~/modules/system';

import { Button } from '~/components/Button';
import {
  getFooter,
  getNumberOfMonths,
  getPickerStyles,
  getRange,
} from '~/components/DatePicker/utils';
import { FlexCenter } from '~/components/Flex';
import { Paragraph } from '~/components/Paragraph';
import { Spacer } from '~/components/Spacer';
import { Text } from '~/components/Text';

import { WithTheme } from '~/types';

import { DatePickerRangeParameter, DatePickerRangeProps, useDatePicker } from './useDatePicker';

const StyledDatePicker = styled(
  'div',
  getStyledOptions('onApply'),
)<DatePickerRangeProps & WithTheme>(props => {
  return getPickerStyles(props);
});

export function DatePickerRange(props: DatePickerRangeProps) {
  const { componentProps, getDataAttributes } = useDatePicker(props, 'range');
  const {
    accent,
    currentMonthLabel,
    formatLocale,
    fromDate,
    month,
    onApply,
    onChange,
    readOnly,
    selected,
    showApply,
    theme: { radius, spacing },
    toDate,
    ...rest
  } = componentProps;
  const [selectedDates, setSelectedDates] = useState<DatePickerRangeParameter | undefined>(
    selected,
  );

  let initialDate: Date | undefined;
  let endDate: Date | undefined;

  if (selectedDates) {
    initialDate = selectedDates[0] ? new Date(selectedDates[0]) : undefined;
    endDate = selectedDates[1] ? new Date(selectedDates[1]) : undefined;
  }

  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(month ?? initialDate);

  const handleClickSelect: SelectRangeEventHandler = selectedRange => {
    setSelectedDates([selectedRange?.from?.toISOString(), selectedRange?.to?.toISOString()]);

    onChange?.([
      selectedRange?.from?.toISOString() ?? undefined,
      selectedRange?.to?.toISOString() ?? undefined,
    ]);
  };

  const handleClickApply = () => {
    onApply?.([selectedDates?.[0], selectedDates?.[1]]);
  };

  const handleClickReset = () => {
    setSelectedDates([undefined, undefined]);

    onChange?.([undefined, undefined]);
  };

  const modifiers = {
    from: initialDate ? new Date(initialDate) : false,
    to: endDate ? new Date(endDate) : false,
  };
  const content: PlainObject<ReactNode> = {
    header: <Paragraph>Select the initial date</Paragraph>,
  };

  if (showApply) {
    content.footer = getFooter(
      setSelectedMonth,
      currentMonthLabel,
      <Spacer>
        <Button
          bg={accent}
          disabled={!initialDate}
          onClick={handleClickReset}
          size="sm"
          variant="bordered"
        >
          Reset
        </Button>
        <Button bg={accent} disabled={!endDate} onClick={handleClickApply} size="sm">
          Apply
        </Button>
      </Spacer>,
    );
  } else {
    content.footer = getFooter(setSelectedMonth, currentMonthLabel);
    content.reset = (
      <Button
        bg={accent}
        onClick={handleClickReset}
        size="sm"
        style={{
          borderRadius: radius.xs,
          minHeight: 24,
          padding: `${spacing.xxs} ${spacing.xs}`,
        }}
        variant="bordered"
      >
        Reset
      </Button>
    );
  }

  if (initialDate && endDate) {
    content.header = (
      <Spacer distribution="center">
        <Text>
          From {formatDateLocale(initialDate.toISOString(), { locale: formatLocale })} to{' '}
          {formatDateLocale(endDate.toISOString(), { locale: formatLocale })}
        </Text>
        {content.reset}
      </Spacer>
    );
  } else if (initialDate) {
    content.header = <Paragraph>Select the final date</Paragraph>;
  }

  return (
    <StyledDatePicker
      {...getDataAttributes('DatePickerRange')}
      {...omit(componentProps, 'hidden', 'onChange')}
    >
      <FlexCenter mb="md" minHeight={30}>
        {content.header}
      </FlexCenter>
      <DayPicker
        mode={readOnly ? undefined : 'range'}
        modifiers={modifiers}
        month={selectedMonth}
        numberOfMonths={getNumberOfMonths(fromDate, toDate)}
        onMonthChange={setSelectedMonth}
        onSelect={handleClickSelect}
        selected={{ from: initialDate, to: endDate }}
        {...getRange<DayPickerRangeProps>(fromDate, toDate)}
        {...rest}
      />
      {content.footer}
    </StyledDatePicker>
  );
}

DatePickerRange.displayName = 'DatePickerRange';

export { rangeDefaultProps, type DatePickerRangeProps } from './useDatePicker';
