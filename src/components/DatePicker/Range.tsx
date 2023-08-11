import { ReactNode, useState } from 'react';
import {
  DateRange,
  DayPicker,
  DayPickerRangeProps,
  SelectRangeEventHandler,
} from 'react-day-picker';
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

import { DatePickerRangerProps } from './types';
import { defaultProps, getFooter, getNumberOfMonths, getRange, getStyles } from './utils';

export const rangeDefaultProps = {
  ...defaultProps,
  showApply: false,
} satisfies DatePickerRangerProps;

const StyledDatePicker = styled(
  'div',
  getStyledOptions('onApply'),
)<DatePickerRangerProps>(props => {
  return getStyles(props);
});

export function DatePickerRange(props: DatePickerRangerProps) {
  const {
    currentMonthLabel,
    formatLocale,
    fromDate,
    onApply,
    onSelect,
    showApply,
    toDate,
    variant,
    ...rest
  } = { ...rangeDefaultProps, ...props };
  const [month, setMonth] = useState<Date | undefined>(undefined);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const { radius, spacing } = getTheme({ theme: useTheme() });

  const handleClickSelect: SelectRangeEventHandler = selectedRange => {
    setRange(selectedRange);

    if (onSelect) {
      onSelect([
        selectedRange?.from?.toISOString() ?? undefined,
        selectedRange?.to?.toISOString() ?? undefined,
      ]);
    }
  };

  const handleClickApply = () => {
    if (onApply) {
      onApply([range?.from?.toISOString() ?? undefined, range?.to?.toISOString() ?? undefined]);
    }
  };

  const handleClickReset = () => {
    setRange({ from: undefined, to: undefined });

    if (onSelect) {
      onSelect([undefined, undefined]);
    }
  };

  const { from, to } = range ?? {};

  const modifiers = { from: from ?? false, to: to ?? false };
  const content: PlainObject<ReactNode> = {
    header: <Paragraph>Select the initial date</Paragraph>,
  };

  if (showApply) {
    content.footer = getFooter(
      setMonth,
      currentMonthLabel,
      <Spacer>
        <Button disabled={!from} invert onClick={handleClickReset} size="sm" variant={variant}>
          Reset
        </Button>
        <Button disabled={!to} onClick={handleClickApply} size="sm" variant={variant}>
          Apply
        </Button>
      </Spacer>,
    );
  } else {
    content.footer = getFooter(setMonth, currentMonthLabel);
    content.reset = (
      <Button
        invert
        onClick={handleClickReset}
        size="sm"
        style={{
          borderRadius: radius.xs,
          minHeight: 24,
          padding: `${spacing.xxs} ${spacing.xs}`,
        }}
        variant={variant}
      >
        Reset
      </Button>
    );
  }

  if (from && to) {
    content.header = (
      <Spacer distribution="center">
        <Text>
          From {formatDateLocale(from.toISOString(), { locale: formatLocale })} to{' '}
          {formatDateLocale(to.toISOString(), { locale: formatLocale })}
        </Text>
        {content.reset}
      </Spacer>
    );
  } else if (from) {
    content.header = <Paragraph>Select the final date</Paragraph>;
  }

  return (
    <StyledDatePicker
      data-component-name="DatePickerRange"
      variant={variant}
      {...omit(props, 'hidden', 'onSelect')}
    >
      <BoxCenter mb="md" minHeight={30}>
        {content.header}
      </BoxCenter>
      <DayPicker
        mode="range"
        modifiers={modifiers}
        month={month}
        numberOfMonths={getNumberOfMonths(fromDate, toDate)}
        onMonthChange={setMonth}
        onSelect={handleClickSelect}
        selected={range}
        {...getRange<DayPickerRangeProps>(fromDate, toDate)}
        {...rest}
      />
      {content.footer}
    </StyledDatePicker>
  );
}

DatePickerRange.displayName = 'DatePickerRange';
