import { cloneElement, isValidElement, ReactElement, ReactNode, useId } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px, round } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';
import is from 'is-lite';

import { horizontalScale } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';
import { easing } from '~/modules/theme';

import { Flex } from '~/components/Flex';
import { Text } from '~/components/Text';

import { WithTheme } from '~/types';

import { ProgressBarProps, useProgressBar } from './useProgressBar';

export const StyledProgressBar = styled('div', getStyledOptions())<
  Pick<ProgressBarProps, 'headerPosition' | 'width'> & WithTheme
>(
  {
    display: 'inline-flex',
  },
  props => {
    const { headerPosition, theme, width } = props;

    const { darkMode, grayScale } = theme;

    return css`
      color: ${darkMode && grayScale['200']};
      flex-direction: ${headerPosition === 'top' ? 'column' : 'column-reverse'};
      width: ${px(width)};
      ${getStyles(props)};
    `;
  },
);

const StyledProgressTrack = styled(
  'div',
  getStyledOptions(),
)<SetRequired<ProgressBarProps, 'accent' | 'busy' | 'size'> & WithTheme>(props => {
  const { accent, backgroundColor, busy, size, theme } = props;
  const { darkMode, grayScale } = theme;
  const { mainColor } = getColorTokens(accent, null, theme);

  let trackColor = darkMode ? grayScale['800'] : grayScale['100'];

  if (backgroundColor) {
    trackColor = getColorTokens(backgroundColor, null, theme).mainColor;
  }

  const heightMap = {
    sm: '6px',
    md: '12px',
    lg: '18px',
  };

  return css`
    background-color: ${trackColor};
    border-radius: ${heightMap[size]};
    line-height: 1;
    height: ${heightMap[size]};
    overflow: hidden;

    > div {
      background-color: ${mainColor};
      border-radius: ${heightMap[size]};
      height: ${heightMap[size]};
      transition: width 0.4s;
      width: 0;

      ${busy &&
      css`
        animation: ${horizontalScale} 1.5s ${easing} infinite normal none running;
        width: 100%;
      `};
    }
  `;
});

/**
 * Make sure to pass the `aria-label` prop when the `label` prop is not provided.
 * This is required for accessibility.
 */
export function ProgressBar(props: ProgressBarProps) {
  const { componentProps, getDataAttributes } = useProgressBar(props);
  const {
    accent,
    backgroundColor,
    busy,
    formatLocale,
    formatOptions,
    headerJustify,
    headerPosition,
    label,
    maxValue,
    minValue,
    showValueLabel,
    size,
    textSize,
    value,
    ...rest
  } = componentProps;
  const labelId = useId();

  const percentage = is.number(value)
    ? round((value - minValue) / (maxValue - minValue))
    : undefined;
  const formattedValue =
    is.number(value) && is.number(percentage)
      ? new Intl.NumberFormat(formatLocale, formatOptions).format(
          formatOptions.style === 'percent' ? percentage : value,
        )
      : undefined;

  const content: Record<string, ReactNode> = {};

  if (label) {
    content.label = isValidElement(label) ? (
      cloneElement(label as ReactElement, { id: labelId })
    ) : (
      <Text id={labelId} size={textSize ?? size}>
        {label}
      </Text>
    );
  }

  if (showValueLabel && formattedValue) {
    content.value = <Text size={textSize ?? size}>{formattedValue}</Text>;
  }

  if (content.label || content.value) {
    content.header = (
      <Flex
        {...getDataAttributes('ProgressBarHeader')}
        justify={headerJustify}
        mb={headerPosition === 'top' ? 'xs' : 0}
        mt={headerPosition === 'bottom' ? 'xs' : 0}
      >
        {content.label}
        {content.value}
      </Flex>
    );
  }

  return (
    <StyledProgressBar
      aria-labelledby={label ? labelId : undefined}
      aria-valuemax={maxValue}
      aria-valuemin={minValue}
      aria-valuenow={value}
      aria-valuetext={formattedValue}
      data-busy={busy}
      {...getDataAttributes('ProgressBar')}
      headerPosition={headerPosition}
      role="progressbar"
      {...rest}
    >
      {content.header}
      <StyledProgressTrack
        accent={accent}
        backgroundColor={backgroundColor}
        busy={busy}
        size={size}
        theme={rest.theme}
      >
        {percentage ? <div style={{ width: `${percentage * 100}%` }} /> : <div />}
      </StyledProgressTrack>
    </StyledProgressBar>
  );
}

ProgressBar.displayName = 'ProgressBar';

export { defaultProps, type ProgressBarProps } from './useProgressBar';
