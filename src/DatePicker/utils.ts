import { DateUtils } from 'react-day-picker';
import { css } from '@emotion/react';
import { AnyObject } from '@gilbarbara/types';
import is from 'is-lite';

import { DatePickerBaseProps, DatePickerSingleClickHandler } from './types';

import { getTheme } from '../modules/helpers';
import { isDarkMode } from '../modules/system';

const firstDayOfWeek = 1;
const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
const weekdaysLong = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const weekdaysShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function formatDay(d: Date) {
  return `${weekdaysLong[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatMonthTitle(d: Date) {
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatWeekdayShort(index: number) {
  return weekdaysShort[index];
}

export function formatWeekdayLong(index: number) {
  return weekdaysLong[index];
}

export function getFirstDayOfWeek() {
  return firstDayOfWeek;
}

export function getNumberOfMonths({
  finalDate,
  initialDate,
}: Pick<DatePickerBaseProps<DatePickerSingleClickHandler>, 'initialDate' | 'finalDate'>): number {
  if (initialDate && finalDate) {
    const day1 = is.date(initialDate) ? initialDate : new Date(initialDate);
    const day2 = is.date(finalDate) ? finalDate : new Date(finalDate);

    return DateUtils.isSameMonth(day1, day2) ? 1 : 2;
  }

  return 2;
}

export function getStyles(props: DatePickerBaseProps<DatePickerSingleClickHandler>) {
  const { variant = 'primary' } = props;
  const { grayLight, grayMid, spacing, typography, variants } = getTheme(props);
  const darkMode = isDarkMode(props);

  const className = 'DayPicker';
  const colorVariant = variants[variant];
  const daySize = '40px';
  const disabledDays = darkMode ? grayMid : grayLight;

  return css`
    .${className} {
      display: inline-block;
      font-size: ${typography.regular.fontSize};
    }

    .${className}-wrapper {
      flex-direction: row;
      position: relative;
      user-select: none;
    }

    .${className}-Months {
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .${className}-Month {
      border-collapse: collapse;
      border-spacing: 0;
      display: table;
      margin: 0 ${spacing.md};
      user-select: none;
    }

    .${className}-NavButton {
      background-position: center;
      background-repeat: no-repeat;
      background-size: 50%;
      color: ${colorVariant.light.bg};
      cursor: pointer;
      display: inline-block;
      height: 20px;
      left: auto;
      margin-top: 2px;
      position: absolute;
      right: 22px;
      top: 0;
      width: 20px;
    }

    .${className}-NavButton:hover {
      opacity: 0.8;
    }

    .${className}-NavButton--prev {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC');
      left: 24px;
      right: auto;
    }

    .${className}-NavButton--next {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==');
    }

    .${className}-NavButton--interactionDisabled {
      display: none;
    }

    .${className}-Caption {
      display: table-caption;
      margin-bottom: ${spacing.xs};
      padding: 0 ${spacing.xs};
      text-align: center;
    }

    .${className}-Caption > div {
      font-size: ${typography.large.fontSize};
    }

    .${className}-Weekdays {
      display: table-header-group;
      margin-top: ${spacing.md};
    }

    .${className}-WeekdaysRow {
      display: table-row;
    }

    .${className}-Weekday {
      color: ${grayMid};
      display: table-cell;
      font-size: ${typography.mid.fontSize};
      padding-bottom: ${spacing.xxs};
      text-align: center;
      width: ${daySize};
    }

    .${className}-Weekday abbr[title] {
      border-bottom: none;
      text-decoration: none;
    }

    .${className}-Body {
      display: table-row-group;
    }

    .${className}-Week {
      display: table-row;
    }

    .${className}-Day {
      border-radius: 50%;
      cursor: pointer;
      display: table-cell;
      height: ${daySize};
      padding: 0;
      text-align: center;
      vertical-align: middle;
      width: ${daySize};
    }

    .${className}-WeekNumber {
      border-right: 1px solid #eaecec;
      color: #8b9898;
      cursor: pointer;
      display: table-cell;
      font-size: ${typography.small.fontSize};
      min-width: ${spacing.xs};
      padding: 0 ${spacing.xs} 0 0;
      text-align: right;
      vertical-align: middle;
    }

    .${className}--interactionDisabled .${className}-Day {
      cursor: default;
    }

    .${className}-Footer {
      padding-top: ${spacing.xxs};
      text-align: center;
    }

    .${className}-TodayButton {
      background-color: transparent;
      background-image: none;
      border: none;
      box-shadow: none;
      color: ${colorVariant.mid.bg};
      cursor: pointer;
      font-size: ${typography.mid.fontSize};
      margin: 0;
      padding: 0;
    }

    .${className}-Day--today {
      color: ${colorVariant.mid.bg};
      font-weight: 700;
    }

    .${className}-Day--outside {
      color: ${disabledDays};
      cursor: default;
    }

    .${className}-Day--disabled {
      color: ${disabledDays};
      cursor: default;
    }

    .${className}-Day--sunday {
      background-color: ${colorVariant.lighter.bg};
    }

    .${className}-Day--sunday:not(.${className}-Day--today) {
      color: ${colorVariant.lighter.bg};
    }

    .${className}-Day--selected:not(.${className}-Day--disabled):not(.${className}-Day--outside) {
      position: relative;

      background-color: ${colorVariant.mid.bg};
      color: ${colorVariant.lightest.bg};
    }

    .${className}-Day--selected:not(.${className}-Day--disabled):not(.${className}-Day--outside):hover {
      background-color: ${colorVariant.mid.bg};
    }

    &:not(&--interactionDisabled) {
      .${className}-Day:not(.${className}-Day--disabled):not(.${className}-Day--selected):not(.${className}-Day--outside):hover {
        background-color: ${darkMode ? colorVariant.light.bg : colorVariant.lighter.bg};
        color: ${colorVariant.darker.bg};
      }
    }
  `;
}

export const locales: AnyObject = {
  pt: {
    localeUtils: {
      formatDay,
      formatMonthTitle,
      formatWeekdayShort,
      formatWeekdayLong,
      getFirstDayOfWeek,
    },
    firstDayOfWeek,
    months,
    weekdaysLong,
    weekdaysShort,
  },
};
