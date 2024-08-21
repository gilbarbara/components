import { cloneElement, isValidElement, ReactElement, ReactNode, useId, useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit, px, round } from '@gilbarbara/helpers';
import is from 'is-lite';

import { rotate } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getStyledOptions, getStyles } from '~/modules/system';
import { easing } from '~/modules/theme';

import { Sizes, TextSizes, WithTheme } from '~/types';

import { ProgressCircleProps, useProgressCircle } from './useProgressCircle';

export const StyledProgressCircle = styled('div', getStyledOptions())<
  Pick<ProgressCircleProps, 'gap' | 'labelPosition' | 'size'> & WithTheme
>(
  {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },
  props => {
    const { labelPosition, size, theme } = props;

    const { darkMode, grayScale } = theme;

    return css`
      color: ${darkMode && grayScale['200']};
      flex-direction: ${labelPosition === 'top' ? 'column' : 'column-reverse'};
      width: ${px(size)};
      ${getStyles(omit(props, 'size'))};
    `;
  },
);

const StyledSVG = styled(
  'svg',
  getStyledOptions(),
)<Required<Pick<ProgressCircleProps, 'busy' | 'size'>>>(props => {
  const { busy, size } = props;

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
)<WithTheme & { absolute?: boolean; size: Sizes | number; textSize?: TextSizes | number }>(
  props => {
    const { absolute, size, textSize, theme } = props;
    const { typography } = theme;

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
  },
);

/**
 Make sure to pass the `aria-label` prop when the `label` prop is not provided.
 This is required for accessibility.
 */
export function ProgressCircle(props: ProgressCircleProps) {
  const { componentProps, getDataAttributes } = useProgressCircle(props);
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
  } = componentProps;
  const labelId = useId();
  const { darkMode, grayScale } = rest.theme;

  const trackColor = darkMode ? grayScale['800'] : grayScale['100'];

  const { mainColor } = getColorTokens(accent, null, rest.theme);

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
      <StyledLabel id={labelId} size={size} textSize={textSize} theme={rest.theme}>
        {label}
      </StyledLabel>
    );
  }

  if (showValueLabel && formattedValue) {
    content.value = (
      <StyledLabel absolute size={size} textSize={textSize} theme={rest.theme}>
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
      {...getDataAttributes('ProgressCircle')}
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

export { defaultProps, type ProgressCircleProps } from './useProgressCircle';
