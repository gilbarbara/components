import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { rangeLimit, round } from '@gilbarbara/helpers';
import { StringOrNumber } from '@gilbarbara/types';

import { getTheme, px } from './modules/helpers';
import { baseStyles, isDarkMode, marginStyles, styledOptions } from './modules/system';
import { Paragraph } from './Paragraph';
import { ComponentProps, StyledProps, WithMargin } from './types';

export interface ProgressKnownProps extends StyledProps, WithMargin {
  bigger?: boolean;
  showProgression?: boolean;
  step: number;
  steps: number;
  /** @default 100% */
  width?: StringOrNumber;
}

export type ProgressProps = ComponentProps<HTMLDivElement, ProgressKnownProps>;

export const StyledProgressBar = styled(
  'div',
  styledOptions,
)<ProgressProps>(props => {
  const { width = '100%' } = props;

  const { grayLight } = getTheme(props);

  return css`
    ${baseStyles(props)};
    ${marginStyles(props)};
    color: ${isDarkMode(props) && grayLight};
    width: ${px(width)};
  `;
});

const StyledProgressTrack = styled(
  'div',
  styledOptions,
)<ProgressProps>(props => {
  const { bigger } = props;
  const { colors, grayLight, radius } = getTheme(props);

  const height = bigger ? '8px' : '4px';

  return css`
    background-color: ${grayLight};
    border-radius: ${bigger ? radius.xs : radius.xxs};
    line-height: 1;
    height: ${height};
    overflow: hidden;

    > div {
      background-color: ${colors.primary};
      height: ${height};
      transition: width 0.4s;
      width: 0;
    }
  `;
});

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const { showProgression, step, steps } = props;
  const percentage = round(rangeLimit((step / steps) * 100));
  const stepLimit = rangeLimit(step, 0, steps);

  return (
    <StyledProgressBar
      ref={ref}
      {...props}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={percentage}
      data-component-name="ProgressBar"
      role="progressbar"
    >
      {showProgression && (
        <Paragraph mb="xs" size="large">{`Step ${stepLimit} of ${steps}`}</Paragraph>
      )}
      <StyledProgressTrack {...props}>
        <div style={{ width: `${percentage}%` }} />
      </StyledProgressTrack>
    </StyledProgressBar>
  );
});

ProgressBar.defaultProps = {
  width: '100%',
};
ProgressBar.displayName = 'ProgressBar';
