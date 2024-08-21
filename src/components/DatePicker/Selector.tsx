import { ReactElement, ReactNode, useCallback, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { formatDateLocale, omit, px } from '@gilbarbara/helpers';
import { useSetState } from '@gilbarbara/hooks';
import { SetRequired } from '@gilbarbara/types';
import { fade } from 'colorizr';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import {
  dimensionStyles,
  getDisableStyles,
  getOutlineStyles,
  getStyledOptions,
  marginStyles,
} from '~/modules/system';

import { ClickOutside } from '~/components/ClickOutside';
import { getNumberOfMonths } from '~/components/DatePicker/utils';
import { FlexCenter } from '~/components/Flex';
import { Icon } from '~/components/Icon';
import { Text } from '~/components/Text';

import { Alignment, WithTheme } from '~/types';

import { DatePickerRange } from './Range';
import { DatePicker } from './Single';
import {
  DatePickerRangeClickHandler,
  DatePickerRangeParameter,
  DatePickerSelectorProps,
  DatePickerSingleClickHandler,
  useDatePickerSelector,
} from './useDatePicker';

interface State {
  isActive: boolean;
  isFilled: boolean;
  selectedDates?: DatePickerRangeParameter | string;
}

const StyledSelector = styled(
  'div',
  getStyledOptions(),
)<DatePickerSelectorProps>(props => {
  return css`
    display: inline-flex;
    position: relative;
    ${dimensionStyles(props, { width: 'auto' })};
    ${marginStyles(props)};
  `;
});

const StyledButton = styled('div', getStyledOptions())<
  SetRequired<
    Omit<DatePickerSelectorProps, 'mode'>,
    'accent' | 'borderless' | 'disabled' | 'height' | 'theme' | 'width'
  > &
    WithTheme & {
      isActive: boolean;
      isFilled: boolean;
    }
>(
  {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '200px',
  },
  props => {
    const { accent, borderless, disabled, height, isActive, isFilled, theme } = props;
    const { darkColor, darkMode, grayScale, inputHeight, lightColor, radius, spacing, white } =
      theme;
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
      color: ${textColor};
      min-height: ${inputHeight[height]};
      ${styles};

      ${disabled &&
      css`
        ${getDisableStyles(props)}
        color: ${grayScale['500']};
      `};

      ${isActive &&
      (borderless
        ? css`
            box-shadow: 0 ${theme.outlineWidth} 0 0 ${fade(mainColor, theme.outlineOpacity)};
            outline: none;
          `
        : getOutlineStyles(mainColor, theme))};
    `;
  },
);

const StyledContent = styled('div', getStyledOptions())<
  WithTheme & {
    isActive: boolean;
    position: Alignment;
    wide: boolean;
  }
>(
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflowY: 'auto',
    position: 'absolute',
    top: '100%',
    transformOrigin: 'top',
    transition: 'transform 0.3s',
    zIndex: 100,
  },
  props => {
    const { isActive, position, theme, wide } = props;
    const { darkMode, grayScale, radius, shadow, spacing, white } = theme;
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
      left: ${left};
      margin-top: ${spacing.xs};
      min-width: ${px(wide ? 600 : 300)};
      padding: ${spacing.md};
      right: ${position === 'right' ? 0 : 'auto'};
      transform: ${`scaleY(0)${translateX}`};

      ${isActive &&
      css`
        transform: ${`scaleY(1)${translateX}`};
      `}
    `;
  },
);

export function DatePickerSelector(props: DatePickerSelectorProps) {
  const { componentProps, getDataAttributes } = useDatePickerSelector(props);
  const {
    borderless,
    disabled,
    formatLocale,
    fromDate,
    mode,
    name,
    onChange,
    open,
    placeholder,
    position,
    selected,
    separator,
    showRangeApply,
    theme,
    toDate,
  } = componentProps;
  const [{ isActive, isFilled, selectedDates }, setState] = useSetState<State>({
    isActive: open ?? false,
    isFilled: false,
    selectedDates: mode === 'range' ? (selected ?? [undefined, undefined]) : (selected ?? ''),
  });

  useEffect(() => {
    if (mode === 'range' && !is.array(selectedDates)) {
      setState({ selectedDates: [undefined, undefined] });
    } else if (mode === 'single' && is.array(selectedDates)) {
      setState({ selectedDates: '' });
    }
  }, [mode, selectedDates, setState]);

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

  let picker: ReactElement;

  if (isRange) {
    const dates = is.array(selectedDates) ? selectedDates : [undefined, undefined];

    picker = (
      <DatePickerRange
        {...componentProps}
        onApply={handleApply}
        onChange={handleSelect as DatePickerRangeClickHandler}
        selected={dates as DatePickerRangeParameter}
        showApply={showRangeApply}
      />
    );
  } else {
    const date = is.array(selectedDates) ? selectedDates[0] : selectedDates;

    picker = (
      <DatePicker
        key={mode}
        {...componentProps}
        onChange={handleSelect as DatePickerSingleClickHandler}
        selected={date}
      />
    );
  }

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

  const numberOfMonths = getNumberOfMonths(fromDate, toDate);

  return (
    <StyledSelector
      key={mode}
      {...getDataAttributes('DatePickerSelector')}
      {...omit(componentProps, 'hidden', 'onChange', 'mode')}
    >
      <ClickOutside active={isActive} onClick={toggle}>
        <StyledButton
          {...getDataAttributes('DatePickerSelectorButton')}
          isActive={isActive}
          isFilled={isFilled}
          onClick={toggle}
          {...omit(componentProps, 'hidden', 'onChange', 'mode')}
        >
          {title}
          <FlexCenter width={borderless ? undefined : 40}>
            <Icon name="calendar" />
          </FlexCenter>
        </StyledButton>
        <StyledContent
          {...getDataAttributes('DatePickerSelectorContent')}
          data-state={isActive ? 'open' : 'closed'}
          isActive={isActive}
          position={position}
          theme={theme}
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
    </StyledSelector>
  );
}

DatePickerSelector.displayName = 'DatePickerSelector';

export { selectorDefaultProps, type DatePickerSelectorProps } from './useDatePicker';
