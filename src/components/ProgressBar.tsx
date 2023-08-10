import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { clamp, px, round } from '@gilbarbara/helpers';
import { StringOrNumber } from '@gilbarbara/types';
import { SetRequired } from 'type-fest';

import { Paragraph } from './Paragraph';

import { getColorVariant, getTheme } from '../modules/helpers';
import { baseStyles, getStyledOptions, isDarkMode, marginStyles } from '../modules/system';
import { ComponentProps, Shades, StyledProps, WithColor, WithMargin } from '../types';

export interface ProgressBarKnownProps extends StyledProps, WithColor, WithMargin {
  /** @default light */
  backgroundShade?: Shades;
  /** @default false */
  hideText?: boolean;
  /** @default false */
  large?: boolean;
  step: number;
  steps: number;
  /** @default 100% */
  width?: StringOrNumber;
}

export type ProgressBarProps = ComponentProps<HTMLDivElement, ProgressBarKnownProps>;

export const defaultProps = {
  backgroundShade: 'light',
  hideText: false,
  large: false,
  shade: 'mid',
  variant: 'primary',
  width: '100%',
} satisfies Omit<ProgressBarProps, 'step' | 'steps'>;

export const StyledProgressBar = styled(
  'div',
  getStyledOptions(),
)<Omit<ProgressBarProps, 'step' | 'steps'>>(props => {
  const { width } = props;

  const { grayLight } = getTheme(props);

  return css`
    ${baseStyles(props)};
    color: ${isDarkMode(props) && grayLight};
    width: ${px(width)};
    ${marginStyles(props)};
  `;
});

const StyledProgressTrack = styled(
  'div',
  getStyledOptions(),
)<SetRequired<ProgressBarProps, 'backgroundShade' | 'variant'>>(props => {
  const { backgroundShade, large, shade, variant } = props;
  const { radius, variants } = getTheme(props);
  const { bg } = getColorVariant(variant, shade, variants);

  const height = large ? '8px' : '4px';

  return css`
    background-color: ${variants.gray[backgroundShade].bg};
    border-radius: ${large ? radius.xs : radius.xxs};
    line-height: 1;
    height: ${height};
    overflow: hidden;

    > div {
      background-color: ${bg};
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
      {!hideText && <Paragraph mb="xs" size="large">{`Step ${stepLimit} of ${steps}`}</Paragraph>}
      <StyledProgressTrack {...rest} {...props}>
        <div style={{ width: `${percentage}%` }} />
      </StyledProgressTrack>
    </StyledProgressBar>
  );
});

ProgressBar.displayName = 'ProgressBar';
