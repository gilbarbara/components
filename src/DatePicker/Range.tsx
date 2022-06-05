import { DateUtils, DayModifiers, RangeModifier } from 'react-day-picker';
import { useSetState } from 'react-use';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { formatDateLocale } from '@gilbarbara/helpers';

import { DatePicker } from './Base';
import { DatePickerBaseProps, DatePickerRangeClickHandler } from './types';
import { getNumberOfMonths } from './utils';

import { BoxCenter } from '../Box';
import { Button } from '../Button';
import { getColorVariant, getTheme } from '../modules/helpers';
import { getStyledOptions } from '../modules/system';
import { Paragraph } from '../Paragraph';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

export type DatePickerRangerProps = DatePickerBaseProps<DatePickerRangeClickHandler>;

const StyledDatePicker = styled(
  'div',
  getStyledOptions(),
)<Pick<DatePickerRangerProps, 'variant'>>(props => {
  const { variant = 'primary' } = props;
  const { variants } = getTheme(props);

  const light = getColorVariant(variant, 'lightest', variants).bg;
  const dark = getColorVariant(variant, 'dark', variants).bg;

  return css`
    .DayPicker-Day {
      border-radius: 0 !important;

      &--selected:not(&--start):not(&--end):not(&--outside) {
        background-color: ${light};
        color: ${dark};
      }

      &--start {
        border-top-left-radius: 50% !important;
        border-bottom-left-radius: 50% !important;
      }

      &--end {
        border-top-right-radius: 50% !important;
        border-bottom-right-radius: 50% !important;
      }
    }
  `;
});

export function DatePickerRange(props: DatePickerRangerProps): JSX.Element {
  const { onClick, ...rest } = props;
  const [{ from, to }, setState] = useSetState<RangeModifier>({ from: undefined, to: undefined });
  const { radius, spacing } = getTheme({ theme: useTheme() });

  const handleClickDay = (day: Date, modifiers: DayModifiers) => {
    if (modifiers.disabled || modifiers.outside) {
      return;
    }

    let range = DateUtils.addDayToRange(day, { from, to });

    if (to) {
      range = DateUtils.addDayToRange(day, { from: undefined, to: undefined });
    }

    setState(range);

    if (onClick) {
      onClick([range.from?.toISOString() || undefined, range.to?.toISOString() || undefined]);
    }
  };

  const handleClickReset = () => {
    setState({ from: undefined, to: undefined });

    if (onClick) {
      onClick([undefined, undefined]);
    }
  };

  const modifiers = { start: from || undefined, end: to || undefined };
  let content = <Paragraph>Select the initial date</Paragraph>;

  if (from && to) {
    content = (
      <Spacer distribution="center">
        <Text>
          From {formatDateLocale(from.toISOString())} to {formatDateLocale(to.toISOString())}
        </Text>
        <Button
          invert
          onClick={handleClickReset}
          size="sm"
          style={{
            borderRadius: radius.xs,
            minHeight: 24,
            padding: `${spacing.xxs} ${spacing.xs}`,
          }}
          variant={rest.variant}
        >
          Reset
        </Button>
      </Spacer>
    );
  } else if (from) {
    content = <Paragraph>Select the final date</Paragraph>;
  }

  return (
    <StyledDatePicker data-component-name="DatePickerRange" variant={rest.variant}>
      <BoxCenter mb="md" minHeight={30}>
        {content}
      </BoxCenter>
      <DatePicker
        modifiers={modifiers}
        numberOfMonths={getNumberOfMonths(rest)}
        onDayClick={handleClickDay}
        selectedDays={[from || undefined, { from, to }]}
        {...rest}
      />
    </StyledDatePicker>
  );
}

DatePickerRange.defaultProps = {
  variant: 'primary',
};
