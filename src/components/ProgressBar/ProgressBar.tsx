import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { clamp, px, round } from '@gilbarbara/helpers';
import { SetRequired, Simplify, StringOrNumber } from '@gilbarbara/types';

import { getColorTokens } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { baseStyles, getStyledOptions, isDarkMode, marginStyles } from '~/modules/system';

import { Paragraph } from '~/components/Paragraph';

import { OmitElementProps, StyledProps, VariantWithTones, WithAccent, WithMargin } from '~/types';

export interface ProgressBarKnownProps extends StyledProps, WithAccent, WithMargin {
  /**
   * Component track color
   * @default 'gray.200'
   */
  backgroundColor?: VariantWithTones;
  /** @default false */
  hideText?: boolean;
  /** @default false */
  large?: boolean;
  step: number;
  steps: number;
  /** @default 100% */
  width?: StringOrNumber;
}

export type ProgressBarProps = Simplify<OmitElementProps<HTMLDivElement, ProgressBarKnownProps>>;

export const defaultProps = {
  accent: 'primary',
  backgroundColor: 'gray.200',
  hideText: false,
  large: false,
  width: '100%',
} satisfies Omit<ProgressBarProps, 'step' | 'steps'>;

export const StyledProgressBar = styled(
  'div',
  getStyledOptions(),
)<Omit<ProgressBarProps, 'step' | 'steps'>>(props => {
  const { width } = props;

  const { grayScale } = getTheme(props);

  return css`
    ${baseStyles(props)};
    color: ${isDarkMode(props) && grayScale['200']};
    width: ${px(width)};
    ${marginStyles(props)};
  `;
});

const StyledProgressTrack = styled(
  'div',
  getStyledOptions(),
)<SetRequired<ProgressBarProps, 'accent' | 'backgroundColor'>>(props => {
  const { accent, backgroundColor, large } = props;
  const { radius, ...theme } = getTheme(props);
  const { mainColor } = getColorTokens(accent, null, theme);
  const { mainColor: bgColor } = getColorTokens(backgroundColor, null, theme);

  const height = large ? '8px' : '4px';

  return css`
    background-color: ${bgColor};
    border-radius: ${large ? radius.xs : radius.xxs};
    line-height: 1;
    height: ${height};
    overflow: hidden;

    > div {
      background-color: ${mainColor};
      height: ${height};
      transition: width 0.4s;
      width: 0;
    }
  `;
});

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const { hideText, step, steps, ...rest } = { ...defaultProps, ...props };
  const percentage = round(clamp((step / steps) * 100));
  const stepLimit = clamp(step, 0, steps);

  return (
    <StyledProgressBar
      ref={ref}
      {...rest}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={percentage}
      data-component-name="ProgressBar"
      role="progressbar"
    >
      {!hideText && <Paragraph mb="xs" size="lg">{`Step ${stepLimit} of ${steps}`}</Paragraph>}
      <StyledProgressTrack {...rest} {...props}>
        <div style={{ width: `${percentage}%` }} />
      </StyledProgressTrack>
    </StyledProgressBar>
  );
});

ProgressBar.displayName = 'ProgressBar';
