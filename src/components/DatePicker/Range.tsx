import { ReactNode, useState } from 'react';
import { DayPicker, DayPickerRangeProps, SelectRangeEventHandler } from 'react-day-picker';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { formatDateLocale, omit } from '@gilbarbara/helpers';
import { PlainObject } from '@gilbarbara/types';

import { getTheme } from '~/modules/helpers';
import { getStyledOptions } from '~/modules/system';

import { BoxCenter } from '~/components/Box';
import { Button } from '~/components/Button';
import { Paragraph } from '~/components/Paragraph';
import { Spacer } from '~/components/Spacer';
import { Text } from '~/components/Text';

import { DatePickerRangeParameter, DatePickerRangeProps } from './types';
import { defaultProps, getFooter, getNumberOfMonths, getRange, getStyles } from './utils';

export const rangeDefaultProps = {
  ...defaultProps,
  readOnly: false,
  showApply: false,
} satisfies DatePickerRangeProps;

const StyledDatePicker = styled(
  'div',
  getStyledOptions('onApply'),
)<DatePickerRangeProps>(props => {
  return getStyles(props);
});

export function DatePickerRange(props: DatePickerRangeProps) {
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
    toDate,
    ...rest
  } = { ...rangeDefaultProps, ...props };
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

  const { radius, spacing } = getTheme({ theme: useTheme() });

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
        <Button bg={accent} disabled={!initialDate} invert onClick={handleClickReset} size="sm">
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
        invert
        onClick={handleClickReset}
        size="sm"
        style={{
          borderRadius: radius.xs,
          minHeight: 24,
          padding: `${spacing.xxs} ${spacing.xs}`,
        }}
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
      accent={accent}
      data-component-name="DatePickerRange"
      {...omit(props, 'hidden', 'onChange')}
    >
      <BoxCenter mb="md" minHeight={30}>
        {content.header}
      </BoxCenter>
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
