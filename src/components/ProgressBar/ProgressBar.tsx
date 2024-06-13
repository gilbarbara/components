import {
  AriaAttributes,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useId,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px, round } from '@gilbarbara/helpers';
import { RequireAtLeastOne, Simplify, StringOrNumber } from '@gilbarbara/types';
import { StandardLonghandProperties } from 'csstype';
import is from 'is-lite';

import { horizontalScale } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { baseStyles, getStyledOptions, isDarkMode, marginStyles } from '~/modules/system';
import { easing } from '~/modules/theme';

import { Box } from '~/components/Box';
import { Text } from '~/components/Text';

import {
  Position,
  StyledProps,
  TextSizes,
  VariantWithTones,
  WithAccent,
  WithComponentSize,
  WithHTMLAttributes,
  WithLabel,
  WithMargin,
} from '~/types';

export interface ProgressBarKnownProps
  extends StyledProps,
    AriaAttributes,
    WithAccent,
    WithComponentSize,
    WithHTMLAttributes,
    WithLabel,
    WithMargin {
  /**
   * Component track color
   * @default 'gray.200'
   */
  backgroundColor?: VariantWithTones;
  /**
   * Whether the progress bar is busy.
   * @default false
   */
  busy?: boolean;
  /**
   * The locale to use for formatting the value.
   * @default 'en-US'
   */
  formatLocale?: string;
  /**
   * The options to use for formatting the value.
   * @default { style: 'percent' }
   */
  formatOptions?: Intl.NumberFormatOptions;
  headerJustify?: StandardLonghandProperties['justifyContent'];
  headerPosition?: Extract<Position, 'bottom' | 'top'>;
  /**
   * The largest value allowed for the value.
   * @default 100
   */
  maxValue?: number;
  /**
   * The smallest value allowed for the value.
   * @default 0
   */
  minValue?: number;
  /**
   * Whether to show the value label.
   * @default false
   */
  showValueLabel?: boolean;
  /**
   * Text size
   */
  textSize?: TextSizes;
  /**
   * A number between `minValue` and `maxValue`
   */
  value: number;
  /** @default 100% */
  width?: StringOrNumber;
}

export type ProgressBarProps = Simplify<RequireAtLeastOne<ProgressBarKnownProps, 'busy' | 'value'>>;

export const defaultProps = {
  accent: 'primary',
  backgroundColor: 'gray.200',
  formatLocale: 'en-US',
  formatOptions: { style: 'percent' },
  headerJustify: 'space-between',
  headerPosition: 'top',
  busy: false,
  maxValue: 100,
  minValue: 0,
  showValueLabel: false,
  size: 'md',
  width: '100%',
} satisfies Omit<ProgressBarProps, 'label' | 'value'>;

export const StyledProgressBar = styled(
  'div',
  getStyledOptions(),
)<Pick<ProgressBarProps, 'headerPosition' | 'width'>>(props => {
  const { headerPosition, width } = props;

  const { grayScale } = getTheme(props);

  return css`
    ${baseStyles(props)};
    color: ${isDarkMode(props) && grayScale['200']};
    display: flex;
    flex-direction: ${headerPosition === 'top' ? 'column' : 'column-reverse'};
    width: ${px(width)};
    ${marginStyles(props)};
  `;
});

const StyledProgressTrack = styled(
  'div',
  getStyledOptions(),
)<Required<Pick<ProgressBarProps, 'accent' | 'backgroundColor' | 'busy' | 'size'>>>(props => {
  const { accent, backgroundColor, busy, size = defaultProps.size } = props;
  const theme = getTheme(props);
  const { mainColor } = getColorTokens(accent, null, theme);
  const { mainColor: bgColor } = getColorTokens(backgroundColor, null, theme);

  const heightMap = {
    sm: '6px',
    md: '12px',
    lg: '18px',
  };

  return css`
    background-color: ${bgColor};
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
  } = mergeProps(defaultProps, props);
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
      <Box
        data-component-name="ProgressBarHeader"
        flexBox
        justify={headerJustify}
        mb={headerPosition === 'top' ? 'xs' : 0}
        mt={headerPosition === 'bottom' ? 'xs' : 0}
      >
        {content.label}
        {content.value}
      </Box>
    );
  }

  return (
    <StyledProgressBar
      {...rest}
      aria-labelledby={label ? labelId : undefined}
      aria-valuemax={maxValue}
      aria-valuemin={minValue}
      aria-valuenow={value}
      aria-valuetext={formattedValue}
      data-busy={busy}
      data-component-name="ProgressBar"
      headerPosition={headerPosition}
      role="progressbar"
    >
      {content.header}
      <StyledProgressTrack
        accent={accent}
        backgroundColor={backgroundColor}
        busy={busy}
        size={size}
      >
        {percentage ? <div style={{ width: `${percentage * 100}%` }} /> : <div />}
      </StyledProgressTrack>
    </StyledProgressBar>
  );
}

ProgressBar.displayName = 'ProgressBar';
