import { ReactNode, useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { formatDateLocale, mergeProps, omit, px } from '@gilbarbara/helpers';
import { useSetState } from '@gilbarbara/hooks';
import is from 'is-lite';
import { transparentize } from 'polished';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import {
  getDisableStyles,
  getOutlineStyles,
  getStyledOptions,
  isDarkMode,
  marginStyles,
} from '~/modules/system';

import { Box, BoxCenter } from '~/components/Box';
import { ClickOutside } from '~/components/ClickOutside';
import { Icon } from '~/components/Icon';
import { Text } from '~/components/Text';

import { Alignment } from '~/types';

import { DatePickerRange } from './Range';
import { DatePicker } from './Single';
import {
  DatePickerRangeClickHandler,
  DatePickerRangeParameter,
  DatePickerSelectorProps,
  DatePickerSingleClickHandler,
} from './types';
import { defaultProps, getNumberOfMonths } from './utils';

interface State {
  isActive: boolean;
  isFilled: boolean;
  selectedDates: DatePickerRangeParameter | string;
}

export const selectorDefaultProps = {
  ...defaultProps,
  accent: 'primary',
  borderless: false,
  disabled: false,
  height: 'md',
  mode: 'single',
  position: 'right',
  separator: ' — ',
  showRangeApply: false,
  width: 'auto',
} satisfies DatePickerSelectorProps;

const StyledButton = styled(
  'div',
  getStyledOptions(),
)<
  Pick<
    DatePickerSelectorProps,
    'accent' | 'borderless' | 'disabled' | 'height' | 'theme' | 'width'
  > &
    Required<Pick<DatePickerSelectorProps, 'height'>> & {
      isActive: boolean;
      isFilled: boolean;
    }
>(props => {
  const {
    accent = selectorDefaultProps.accent,
    borderless,
    disabled,
    height,
    isActive,
    isFilled,
    width,
  } = props;
  const { darkColor, grayScale, inputHeight, lightColor, radius, spacing, white, ...theme } =
    getTheme(props);
  const darkMode = isDarkMode(props);
  const { mainColor } = getColorTokens(accent, null, theme);

  let borderColor = darkMode ? grayScale['700'] : grayScale['500'];
  let textColor = grayScale['500'];

  if (isFilled) {
    borderColor = mainColor;
    textColor = darkMode ? lightColor : darkColor;
  }

  const styles = borderless
    ? css`
        border-bottom: 1px solid ${borderColor};
        border-radius: 0 !important;
        padding: ${spacing.xxs} 0;
      `
    : css`
        background-color: ${darkMode ? grayScale['800'] : white};
        border: 1px solid ${borderColor};
        border-radius: ${radius.xs};
        padding-left: ${spacing.md};
      `;

  return css`
    align-items: center;
    color: ${textColor};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    min-height: ${inputHeight[height]};
    min-width: 200px;
    width: ${width ? px(width) : 'auto'};
    ${styles};
    ${marginStyles(props)};

    ${disabled &&
    css`
      ${getDisableStyles(props)}
      color: ${grayScale['500']};
    `};

    ${isActive &&
    !!borderless &&
    css`
      box-shadow: 0 3px 0 0 ${transparentize(0.5, mainColor)};
      outline: none;
    `}
    ${isActive && !borderless && getOutlineStyles(mainColor)}
  `;
});

const StyledContent = styled(
  'div',
  getStyledOptions(),
)<{ isActive: boolean; position: Alignment; wide: boolean }>(props => {
  const { isActive, position, wide } = props;
  const { grayScale, radius, shadow, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);
  let left = position === 'left' ? 0 : 'auto';
  let translateX = '';

  if (position === 'center') {
    left = '50%';
    translateX = ' translateX(-50%)';
  }

  return css`
    background-color: ${darkMode ? grayScale['800'] : white};
    border-radius: ${radius.xxs};
    box-shadow: ${shadow.mid};
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: ${left};
    margin-top: ${spacing.xs};
    min-width: ${px(wide ? 600 : 300)};
    overflow-y: auto;
    padding: ${spacing.md};
    position: absolute;
    right: ${position === 'right' ? 0 : 'auto'};
    top: 100%;
    transform-origin: top;
    transform: ${`scaleY(0)${translateX}`};
    transition: transform 0.3s;
    z-index: 100;

    ${isActive &&
    css`
      transform: ${`scaleY(1)${translateX}`};
    `}
  `;
});

export function DatePickerSelector(props: DatePickerSelectorProps) {
  const {
    borderless,
    disabled,
    formatLocale,
    height,
    mode,
    name,
    onChange,
    open,
    placeholder,
    position,
    selected,
    separator,
    showRangeApply,
    width,
    ...rest
  } = mergeProps(selectorDefaultProps, props);
  const [{ isActive, isFilled, selectedDates }, setState] = useSetState<State>({
    isActive: open ?? false,
    isFilled: false,
    selectedDates: mode === 'range' ? (selected ?? [undefined, undefined]) : (selected ?? ''),
  });
  const isRange = mode === 'range';

  const toggle = useCallback(() => {
    if (is.boolean(open) || disabled) {
      return;
    }

    setState(s => ({ isActive: !s.isActive }));
  }, [disabled, open, setState]);

  const handleApply = (isoDate: DatePickerRangeParameter) => {
    if (onChange) {
      (onChange as DatePickerRangeClickHandler)(isoDate);
    }

    toggle();
  };

  const handleSelect = (isoDate: DatePickerRangeParameter & string) => {
    setState({
      isFilled: is.array(isoDate) ? isoDate.some(Boolean) : !!isoDate,
      selectedDates: isoDate,
    });

    if (onChange && !showRangeApply) {
      onChange(isoDate);
    }

    if (
      !showRangeApply &&
      ((is.array(isoDate) && isoDate.every(Boolean)) || (!is.array(isoDate) && isoDate))
    ) {
      toggle();
    }
  };

  const picker = isRange ? (
    <DatePickerRange
      {...rest}
      onApply={handleApply}
      onChange={handleSelect as DatePickerRangeClickHandler}
      selected={selectedDates as DatePickerRangeParameter}
      showApply={showRangeApply}
    />
  ) : (
    <DatePicker
      {...rest}
      onChange={handleSelect as DatePickerSingleClickHandler}
      selected={selectedDates as string}
    />
  );

  let title: ReactNode = isRange ? 'Select a date range' : 'Select a date';

  if (placeholder) {
    title = placeholder;
  }

  if (is.array(selectedDates) && selectedDates.some(Boolean)) {
    const dates = selectedDates.reduce<string[]>((acc, d, index) => {
      acc.push(d ? formatDateLocale(d, { locale: formatLocale }) : '???');

      if (index === 0) {
        acc.push(separator);
      }

      return acc;
    }, []);

    title = <Text>{dates.map(d => d)}</Text>;
  } else if (!is.array(selectedDates) && selectedDates) {
    title = formatDateLocale(selectedDates, { locale: formatLocale });
  }

  const numberOfMonths = getNumberOfMonths(rest.fromDate, rest.toDate);

  return (
    <Box data-component-name="DatePickerSelector" position="relative">
      <ClickOutside active={isActive} onClick={toggle}>
        <StyledButton
          data-component-name="DatePickerSelectorButton"
          height={height}
          isActive={isActive}
          isFilled={isFilled}
          onClick={toggle}
          {...omit(props, 'hidden', 'onChange')}
        >
          {title}
          <BoxCenter width={borderless ? undefined : 40}>
            <Icon name="calendar" />
          </BoxCenter>
        </StyledButton>
        <StyledContent
          data-component-name="DatePickerSelectorContent"
          data-state={isActive ? 'open' : 'closed'}
          isActive={isActive}
          position={position}
          wide={isRange && numberOfMonths > 1}
        >
          {picker}
        </StyledContent>
        {name && (
          <input
            name={name}
            type="hidden"
            value={
              is.array(selectedDates) ? selectedDates.filter(Boolean).join(',') : selectedDates
            }
          />
        )}
      </ClickOutside>
    </Box>
  );
}

DatePickerSelector.displayName = 'DatePickerSelector';
