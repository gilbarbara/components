import { ReactNode } from 'react';
import { useSetState } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { formatDateLocale, omit } from '@gilbarbara/helpers';
import is from 'is-lite';

import { DatePicker } from './Base';
import { DatePickerRange } from './Range';
import {
  DatePickerBaseProps,
  DatePickerClickHandler,
  DatePickerRangeClickHandler,
  DatePickerRangeParameter,
  DatePickerSingleClickHandler,
} from './types';
import { getNumberOfMonths } from './utils';

import { Box } from '../Box';
import { ClickOutside } from '../ClickOutside';
import { Icon } from '../Icon';
import { getColorVariant, getTheme, px } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { Text } from '../Text';

export interface DatePickerInputProps extends DatePickerBaseProps<DatePickerClickHandler> {
  borderless?: boolean;
  large?: boolean;
  open?: boolean;
  placeholder?: string;
  separator?: string;
  showRange?: boolean;
  width?: number;
}

interface State {
  isActive: boolean;
  isFilled: boolean;
  selected: DatePickerRangeParameter | string;
}

const StyledButton = styled(
  'div',
  getStyledOptions(),
)<
  Pick<DatePickerInputProps, 'large' | 'borderless' | 'theme' | 'variant' | 'width'> & {
    isFilled: boolean;
  }
>(props => {
  const { borderless, isFilled, large, variant = 'primary', width } = props;
  const {
    darkColor,
    grayDark,
    grayDarker,
    grayMid,
    inputHeight,
    lightColor,
    radius,
    spacing,
    variants,
    white,
  } = getTheme(props);
  const darkMode = isDarkMode(props);

  const { bg } = getColorVariant(variant, 'mid', variants);
  let borderColor = darkMode ? grayDark : grayMid;
  let textColor = grayMid;

  if (isFilled) {
    borderColor = bg;
    textColor = darkMode ? lightColor : darkColor;
  }

  const styles = borderless
    ? css`
        border: 0 !important;
        border-bottom: 1px solid ${borderColor} !important;
        border-radius: 0 !important;
        padding: ${spacing.xxs} 0 !important;
      `
    : css`
        border: 1px solid ${borderColor};
        border-radius: ${radius.xs};
        padding: 0 ${spacing.md} !important;
      `;

  return css`
    align-items: center;
    background-color: ${darkMode ? grayDarker : white};
    color: ${textColor};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    min-height: ${large ? inputHeight.large : inputHeight.normal};
    min-width: ${px(width || 240)};
    width: ${width ? px(width) : 'auto'};
    ${styles};
  `;
});

const StyledContent = styled(
  'div',
  getStyledOptions(),
)<{ isActive: boolean; wide: boolean }>(props => {
  const { isActive, wide } = props;
  const { grayDarker, radius, shadow, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);

  return css`
    background-color: ${darkMode ? grayDarker : white};
    border-radius: ${radius.xxs};
    box-shadow: ${shadow.mid};
    display: flex;
    justify-content: center;
    margin-top: ${spacing.xs};
    overflow-y: auto;
    padding: ${spacing.xs};
    position: absolute;
    right: 0;
    top: 100%;
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.3s;
    width: ${px(wide ? 640 : 320)};
    z-index: 100;

    ${isActive &&
    css`
      transform: scaleY(1);
    `}
  `;
});

export function DatePickerInput(props: DatePickerInputProps): JSX.Element {
  const {
    borderless,
    large,
    onClick,
    open,
    placeholder,
    separator = ' — ',
    showRange = false,
    width,
    ...rest
  } = props;
  const [{ isActive, isFilled, selected }, setState] = useSetState<State>({
    isActive: open || false,
    isFilled: false,
    selected: showRange ? [undefined, undefined] : '',
  });

  const toggle = () => {
    if (is.boolean(open)) {
      return;
    }

    setState(s => ({ isActive: !s.isActive }));
  };

  const handleClickDay = (isoDate: DatePickerRangeParameter | string) => {
    setState({
      isFilled: is.array(isoDate) ? isoDate.some(Boolean) : !!isoDate,
      selected: isoDate,
    });

    if (onClick) {
      onClick(isoDate);
    }

    if ((is.array(isoDate) && isoDate.every(Boolean)) || (!is.array(isoDate) && isoDate)) {
      toggle();
    }
  };

  const picker = showRange ? (
    <DatePickerRange {...rest} onClick={handleClickDay as DatePickerRangeClickHandler} />
  ) : (
    <DatePicker {...rest} onClick={handleClickDay as DatePickerSingleClickHandler} />
  );

  let title: ReactNode = showRange ? 'Select a date range' : 'Select a date';

  if (placeholder) {
    title = placeholder;
  }

  if (is.array(selected) && selected.some(Boolean)) {
    const dates = selected.reduce((acc, d, index) => {
      acc.push(d ? formatDateLocale(d) : '???');

      if (index === 0) {
        acc.push(separator);
      }

      return acc;
    }, [] as string[]);

    title = <Text>{dates.map(d => d)}</Text>;
  } else if (!is.array(selected) && selected) {
    title = formatDateLocale(selected);
  }

  const numberOfMonths = getNumberOfMonths(rest);

  return (
    <Box data-component-name="DatePickerInput" position="relative">
      <StyledButton
        data-component-name="DatePickerInputButton"
        isFilled={isFilled}
        onClick={toggle}
        {...omit(props, 'onClick')}
      >
        {title}
        <Icon name="calendar" />
      </StyledButton>
      <ClickOutside active={isActive} onClick={toggle}>
        <StyledContent
          data-component-name="DatePickerInputContent"
          isActive={isActive}
          wide={showRange && numberOfMonths > 1}
        >
          {picker}
        </StyledContent>
      </ClickOutside>
    </Box>
  );
}

DatePickerInput.defaultProps = {
  borderless: false,
  large: false,
  showRange: false,
  variant: 'primary',
};
