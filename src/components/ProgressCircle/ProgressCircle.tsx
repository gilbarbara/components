import {
  AriaAttributes,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useId,
  useMemo,
} from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px, round } from '@gilbarbara/helpers';
import { RequireAtLeastOne, Simplify } from '@gilbarbara/types';
import is from 'is-lite';

import { rotate } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { baseStyles, getStyledOptions, isDarkMode, marginStyles } from '~/modules/system';
import { easing } from '~/modules/theme';

import {
  Position,
  Sizes,
  Spacing,
  StyledProps,
  TextSizes,
  VariantWithTones,
  WithAccent,
  WithHTMLAttributes,
  WithLabel,
  WithMargin,
} from '~/types';

export interface ProgressCircleKnownProps
  extends StyledProps,
    AriaAttributes,
    WithAccent,
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
  /**
   * The gap between the progress circle and the label.
   * @default xs
   */
  gap?: Spacing;
  labelPosition?: Position;
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
   *	Whether to show the value label.
   * @default false
   */
  showValueLabel?: boolean;
  /**
   * Component size
   * @default md
   */
  size?: Sizes | number;
  /**
   * The width of the stroke.
   * @default 3
   */
  strokeWidth?: number;
  /**
   * Text size
   */
  textSize?: TextSizes | number;
  /**
   * A number between `minValue` and `maxValue`
   */
  value: number;
}

export type ProgressCircleProps = Simplify<
  RequireAtLeastOne<ProgressCircleKnownProps, 'busy' | 'value'>
>;

export const defaultProps = {
  accent: 'primary',
  busy: false,
  formatLocale: 'en-US',
  formatOptions: { style: 'percent' },
  gap: 'xs',
  labelPosition: 'top',
  maxValue: 100,
  minValue: 0,
  showValueLabel: false,
  size: 'md',
  strokeWidth: 3,
} satisfies Omit<ProgressCircleProps, 'label' | 'value'>;

export const StyledProgressCircle = styled(
  'div',
  getStyledOptions(),
)<Pick<ProgressCircleProps, 'gap' | 'labelPosition' | 'size'>>(props => {
  const { gap = defaultProps.gap, labelPosition, size } = props;

  const { grayScale, spacing } = getTheme(props);

  return css`
    ${baseStyles(props)};
    align-items: center;
    color: ${isDarkMode(props) && grayScale['200']};
    display: flex;
    flex-direction: ${labelPosition === 'top' ? 'column' : 'column-reverse'};
    gap: ${spacing[gap]};
    justify-content: center;
    width: ${px(size)};
    ${marginStyles(props)};
  `;
});

const StyledSVG = styled(
  'svg',
  getStyledOptions(),
)<Required<Pick<ProgressCircleProps, 'busy' | 'size'>>>(props => {
  const { busy, size = defaultProps.size } = props;

  const sizeMap = {
    sm: '32px',
    md: '48px',
    lg: '64px',
  };

  const componentSize = is.number(size) ? px(size) : sizeMap[size];

  return css`
    border-radius: ${componentSize};
    height: ${componentSize};
    overflow: hidden;
    position: relative;
    width: ${componentSize};

    ${busy &&
    css`
      animation: ${rotate} 0.8s ${easing} infinite normal none running;
    `};
  `;
});

const StyledWrapper = styled.div`
  display: flex;
  position: relative;
`;

const StyledLabel = styled(
  'span',
  getStyledOptions(),
)<{ absolute?: boolean; size: Sizes | number; textSize?: TextSizes | number }>(props => {
  const { absolute, size, textSize } = props;
  const { typography } = getTheme(props);

  const fontSizeMap = {
    sm: typography.xxs.fontSize,
    md: typography.xs.fontSize,
    lg: typography.sm.fontSize,
  };

  let fontSize = is.number(size) ? typography.md.fontSize : fontSizeMap[size];

  if (textSize) {
    fontSize = is.number(textSize) ? px(textSize) : typography[textSize].fontSize;
  }

  if (!absolute && !is.number(size) && !textSize) {
    fontSize = typography[size].fontSize;
  }

  return css`
    font-size: ${fontSize};

    ${absolute &&
    css`
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    `}
  `;
});

/**
 Make sure to pass the `aria-label` prop when the `label` prop is not provided.
 This is required for accessibility.
 */
export function ProgressCircle(props: ProgressCircleProps) {
  const {
    accent,
    backgroundColor,
    busy,
    formatLocale,
    formatOptions,
    label,
    labelPosition,
    maxValue,
    minValue,
    showValueLabel,
    size,
    strokeWidth,
    textSize,
    value,
    ...rest
  } = mergeProps(defaultProps, props);
  const { grayScale, ...theme } = getTheme({ theme: useTheme() });
  const labelId = useId();

  const darkMode = isDarkMode(props);

  const trackColor = darkMode ? grayScale['800'] : grayScale['100'];

  const { mainColor } = getColorTokens(accent, null, theme);

  const center = 16;
  const radius = 16 - strokeWidth / 2;
  const circumference = 2 * radius * Math.PI;
  const percentage = useMemo(() => {
    if (busy) {
      return 0.25;
    }

    return value ? round((value - minValue) / (maxValue - minValue)) : 0;
  }, [busy, maxValue, minValue, value]);

  const offset = circumference - percentage * circumference;
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
      <StyledLabel id={labelId} size={size} textSize={textSize}>
        {label}
      </StyledLabel>
    );
  }

  if (showValueLabel && formattedValue) {
    content.value = (
      <StyledLabel absolute size={size} textSize={textSize}>
        {formattedValue}
      </StyledLabel>
    );
  }

  return (
    <StyledProgressCircle
      {...rest}
      aria-labelledby={label ? labelId : undefined}
      aria-valuemax={maxValue}
      aria-valuemin={minValue}
      aria-valuenow={value}
      aria-valuetext={formattedValue}
      data-busy={busy}
      data-component-name="ProgressCircle"
      labelPosition={labelPosition}
      role="progressbar"
    >
      <StyledWrapper>
        <StyledSVG
          busy={busy}
          fill="none"
          size={size}
          strokeWidth={strokeWidth}
          viewBox="0 0 32 32"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            role="presentation"
            stroke={backgroundColor ?? trackColor}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            role="presentation"
            stroke={mainColor}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 16 16)"
          />
        </StyledSVG>
        {content.value}
      </StyledWrapper>
      {content.label}
    </StyledProgressCircle>
  );
}

ProgressCircle.displayName = 'ProgressCircle';
