import { ReactNode } from 'react';
import { DayPickerProps } from 'react-day-picker';
import { css } from '@emotion/react';
import { textColor } from 'colorizr';
import { isSameMonth } from 'date-fns';
import is from 'is-lite';

import { getTheme } from '~/modules/helpers';
import {
  borderStyles,
  isDarkMode,
  marginStyles,
  paddingStyles,
  radiusStyles,
  shadowStyles,
} from '~/modules/system';

import { Box } from '~/components/Box';
import { ButtonUnstyled } from '~/components/ButtonUnstyled';

import { DatePickerBaseProps, DatePickerLayoutProps } from './types';

export const defaultProps = {
  accent: 'primary',
  formatLocale: 'en-US',
  currentMonthLabel: 'Go to today',
} as const;

export function getNumberOfMonths(fromDate?: Date | string, toDate?: Date | string): number {
  if (fromDate && toDate) {
    const day1 = is.date(fromDate) ? fromDate : new Date(fromDate);
    const day2 = is.date(toDate) ? toDate : new Date(toDate);

    return isSameMonth(day1, day2) ? 1 : 2;
  }

  return 2;
}

export function getFooter(setter: (date: Date) => void, label: ReactNode, apply?: ReactNode) {
  if (!label && !apply) {
    return null;
  }

  return (
    <Box
      align="end"
      direction="row"
      display="flex"
      justify={apply ? 'space-between' : 'center'}
      mt="xs"
    >
      <ButtonUnstyled onClick={() => setter(new Date())}>{label}</ButtonUnstyled>
      {apply}
    </Box>
  );
}

export function getRange<T extends DayPickerProps>(
  fromDate?: Date | string,
  toDate?: Date | string,
) {
  const additionalProps: Partial<T> = {};
  let dateStart;
  let dateEnd;

  if (fromDate) {
    dateStart = is.date(fromDate) ? fromDate : new Date(fromDate);

    additionalProps.fromMonth = new Date(dateStart.getFullYear(), dateStart.getMonth());
    additionalProps.disabled = [
      {
        from: new Date(dateStart.getFullYear(), dateStart.getMonth(), 0),
        to: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()),
      },
    ];
  }

  if (toDate) {
    dateEnd = is.date(toDate) ? toDate : new Date(toDate);
    const disabledDays = [];

    disabledDays.push({
      from: new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate()),
      to: new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 1, 1),
    });

    if (dateStart && dateStart.getMonth() === dateEnd.getMonth()) {
      disabledDays.push({
        from: new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 1, 0),
        to: new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 2, 1),
      });
    }

    additionalProps.toMonth = new Date(dateEnd.getFullYear(), dateEnd.getMonth());

    additionalProps.disabled = is.array(additionalProps.disabled)
      ? [...additionalProps.disabled, ...disabledDays]
      : disabledDays;
  }

  return additionalProps;
}

export function getStyles(props: DatePickerBaseProps & DatePickerLayoutProps) {
  const { accent = 'primary' } = props;
  const { colors, grayScale, spacing, typography, variants } = getTheme(props);
  const darkMode = isDarkMode(props);

  const className = 'rdp';
  const colorMain = colors[accent];
  const colorVariant = variants[accent];
  const cellSize = '40px';
  const disabledDays = darkMode ? grayScale['500'] : grayScale['200'];

  return css`
    ${borderStyles(props)};
    ${marginStyles(props)};
    ${paddingStyles(props)};
    ${radiusStyles(props)};
    ${shadowStyles(props)};

    /* Hide elements for devices that are not screen readers */
    .${className}-vhidden {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      border: 0;
      box-sizing: border-box;
      clip: rect(1px, 1px, 1px, 1px) !important;
      height: 1px !important;
      margin: 0;
      overflow: hidden !important;
      padding: 0;
      position: absolute !important;
      top: 0;
      width: 1px !important;
    }

    /* Buttons */
    .${className}-button_reset {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background: none;
      color: inherit;
      cursor: default;
      font: inherit;
      margin: 0;
      outline: none;
      padding: 0;
      position: relative;
    }

    .${className}-button {
      border: 0;

      &[aria-disabled='true'] {
        color: ${disabledDays};
        pointer-events: none;
      }

      &:not([aria-disabled='true']) {
        cursor: pointer;
      }

      &:focus,
      &:active {
        background-color: ${colorVariant['50']};
      }

      &:hover:not([aria-disabled='true']) {
        background-color: ${colorVariant[50]};
      }
    }

    .${className}-months {
      display: flex;
    }

    .${className}-month {
      margin: 0 ${spacing.xs};

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }

    .${className}-table {
      border-collapse: collapse;
      margin: 0;
      max-width: calc(${cellSize} * 7);
    }

    .${className}-with_weeknumber .${className}-table {
      border-collapse: collapse;
      max-width: calc(${cellSize} * 8);
    }

    .${className}-caption {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: ${spacing.xs};
      padding: 0;
      text-align: left;
    }

    .${className}-multiple_months .${className}-caption {
      display: block;
      position: relative;
      text-align: center;
    }

    .${className}-caption_dropdowns {
      display: inline-flex;
      position: relative;
    }

    .${className}-caption_label {
      align-items: center;
      border: 0;
      color: currentColor;
      display: inline-flex;
      font-family: inherit;
      font-size: ${typography.lg.fontSize};
      font-weight: normal;
      margin: 0;
      padding: 0 ${spacing.xs};
      position: relative;
      white-space: nowrap;
      z-index: 1;
    }

    .${className}-nav {
      display: flex;
      white-space: nowrap;
    }

    .${className}-multiple_months .${className}-caption_start .${className}-nav {
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .${className}-multiple_months .${className}-caption_end .${className}-nav {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    .${className}-nav_button {
      align-items: center;
      display: inline-flex;
      height: 22px;
      justify-content: center;
      padding: 0;
      width: 22px;

      &:focus,
      &:active {
        background-color: transparent;
      }

      &:hover:not([aria-disabled='true']) {
        background-color: transparent;
      }
    }

    .${className}:not(.${className}-multiple_months) {
      .${className}-caption {
        justify-content: center;
        position: relative;
      }

      .${className}-nav {
        left: 0;
        position: absolute;
        top: 0;
        right: 0;
      }

      .${className}-nav_button_next {
        position: absolute;
        right: 0;
      }
    }

    /* ---------- */
    /* Dropdowns  */
    /* ---------- */

    .${className}-dropdown_year, .${className}-dropdown_month {
      align-items: center;
      display: inline-flex;
      position: relative;
    }

    .${className}-dropdown {
      appearance: none;
      background-color: transparent;
      border: none;
      bottom: 0;
      cursor: inherit;
      font-family: inherit;
      font-size: inherit;
      left: 0;
      line-height: inherit;
      margin: 0;
      opacity: 0;
      padding: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 2;

      &[disabled] {
        color: unset;
        opacity: unset;
      }
    }

    .${className}-dropdown_icon {
      margin: 0 0 0 5px;
    }

    .${className}-head {
      border: 0;
    }

    .${className}-head_row, .${className}-row {
      height: 100%;
    }

    .${className}-head_cell {
      color: ${grayScale['500']};
      font-size: ${typography.sm.fontSize};
      font-weight: normal;
      height: 24px;
      padding: 0;
      text-align: center;
      vertical-align: middle;
    }

    .${className}-tbody {
      border: 0;
    }

    .${className}-tfoot {
      margin: ${spacing.xs};
    }

    .${className}-cell {
      height: ${cellSize};
      padding: 0;
      text-align: center;
      width: ${cellSize};
    }

    .${className}-weeknumber {
      font-size: ${typography.sm.fontSize};
    }

    .${className}-weeknumber, .${className}-day {
      align-items: center;
      border-radius: 100%;
      border: 2px solid transparent;
      box-sizing: border-box;
      display: flex;
      height: ${cellSize};
      justify-content: center;
      margin: 0;
      max-width: ${cellSize};
      overflow: hidden;
      width: ${cellSize};
    }

    .${className}-day_today:not(.${className}-day_outside) {
      color: ${colorMain};
      font-weight: bold;
    }

    .${className}-day_selected:not([aria-disabled='true']),
    .${className}-day_selected:focus:not([aria-disabled='true']),
    .${className}-day_selected:active:not([aria-disabled='true']),
    .${className}-day_selected:hover:not([aria-disabled='true']) {
      background-color: ${colorMain};
      color: ${textColor(colorMain)};
    }

    .${className}-day_selected:focus:not([aria-disabled='true']) {
      border: 2px solid ${colorMain};
    }

    .${className}:not([dir='rtl']) {
      .${className}-day_range_start:not(.${className}-day_range_end) {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }

      .${className}-day_range_end:not(.${className}-day_range_start) {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
    }

    .${className}[dir='rtl'] {
      .${className}-day_range_start:not(.${className}-day_range_end) {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }

      .${className}-day_range_end:not(.${className}-day_range_start) {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }
    }

    .${className}-day_range_end.${className}-day_range_start {
      border-radius: 100%;
    }

    .${className}-day_range_middle {
      border-radius: 0;
      background-color: ${colorVariant[50]} !important;
      color: ${variants.gray['900']} !important;
    }
  `;
}
