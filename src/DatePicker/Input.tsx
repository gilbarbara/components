import { ReactNode } from 'react';
import { useSetState } from 'react-use';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { formatDateLocale, omit } from '@gilbarbara/helpers';
import { StringOrNumber } from '@gilbarbara/types';
import is from 'is-lite';

import { DatePickerRange } from './Range';
import { DatePicker } from './Single';
import {
  DatePickerBaseProps,
  DatePickerClickHandler,
  DatePickerRangeClickHandler,
  DatePickerRangeParameter,
  DatePickerSingleClickHandler,
} from './types';
import { defaultProps, getNumberOfMonths } from './utils';

import { Box } from '../Box';
import { ClickOutside } from '../ClickOutside';
import { Icon } from '../Icon';
import { getColorVariant, getTheme, px } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { Text } from '../Text';
import { Alignment, WithBorderless, WithOpen } from '../types';

export interface DatePickerInputProps
  extends WithBorderless,
    WithOpen,
    DatePickerBaseProps<DatePickerClickHandler> {
  /**  @default en-US */
  formatLocale?: string;
  large?: boolean;
  placeholder?: string;
  /** @default right */
  position?: Alignment;
  separator?: string;
  showRange?: boolean;
  showRangeApply?: boolean;
  width?: StringOrNumber;
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
    min-width: 240px;
    width: ${width ? px(width) : 'auto'};
    ${styles};
  `;
});

const StyledContent = styled(
  'div',
  getStyledOptions(),
)<{ isActive: boolean; position: Alignment; wide: boolean }>(props => {
  const { isActive, position, wide } = props;
  const { grayDarker, radius, shadow, spacing, white } = getTheme(props);
  const darkMode = isDarkMode(props);
  let left = position === 'left' ? 0 : 'auto';
  let translateX = '';

  if (position === 'center') {
    left = '50%';
    translateX = ' translateX(-50%)';
  }

  return css`
    background-color: ${darkMode ? grayDarker : white};
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

export function DatePickerInput(props: DatePickerInputProps): JSX.Element {
  const {
    borderless,
    large,
    onSelect,
    open,
    placeholder,
    position = 'right',
    separator = ' — ',
    showRange = false,
    showRangeApply,
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

  const handleApply = (isoDate: DatePickerRangeParameter) => {
    if (onSelect) {
      onSelect(isoDate);
    }

    toggle();
  };

  const handleSelect = (isoDate: DatePickerRangeParameter | string) => {
    setState({
      isFilled: is.array(isoDate) ? isoDate.some(Boolean) : !!isoDate,
      selected: isoDate,
    });

    if (onSelect && !showRangeApply) {
      onSelect(isoDate);
    }

    if (
      !showRangeApply &&
      ((is.array(isoDate) && isoDate.every(Boolean)) || (!is.array(isoDate) && isoDate))
    ) {
      toggle();
    }
  };

  const picker = showRange ? (
    <DatePickerRange
      {...rest}
      onApply={handleApply}
      onSelect={handleSelect as DatePickerRangeClickHandler}
      showApply={showRangeApply}
    />
  ) : (
    <DatePicker {...rest} onSelect={handleSelect as DatePickerSingleClickHandler} />
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

  const numberOfMonths = getNumberOfMonths(rest.fromDate, rest.toDate);

  return (
    <Box data-component-name="DatePickerInput" position="relative">
      <ClickOutside active={isActive} onClick={toggle}>
        <StyledButton
          data-component-name="DatePickerInputButton"
          isFilled={isFilled}
          onClick={toggle}
          {...omit(props, 'onSelect')}
        >
          {title}
          <Icon name="calendar" />
        </StyledButton>
        <StyledContent
          data-component-name="DatePickerInputContent"
          isActive={isActive}
          position={position}
          wide={showRange && numberOfMonths > 1}
        >
          {picker}
        </StyledContent>
      </ClickOutside>
    </Box>
  );
}

DatePickerInput.defaultProps = {
  ...defaultProps,
  borderless: false,
  formatLocale: 'en-US',
  large: false,
  position: 'right',
  separator: ' — ',
  showRange: false,
  showRangeApply: false,
  variant: 'primary',
  width: 'auto',
};
