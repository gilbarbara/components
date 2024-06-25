import { cloneElement, isValidElement, ReactElement, ReactNode, useId } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { SetRequired, Simplify } from '@gilbarbara/types';

import { getColorTokens, getColorWithTone } from '~/modules/colors';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions, marginStyles } from '~/modules/system';

import { Text } from '~/components/Text';

import {
  OmitElementProps,
  Position,
  Spacing,
  StyledProps,
  Tone,
  Variant,
  WithMargin,
} from '~/types';

export interface StatusIndicatorKnownProps extends StyledProps, WithMargin {
  /**
   * The size of the inner circle relative to the outer circle.
   * @default 0.7
   */
  borderRatio?: number;
  /** Component color */
  color?: Variant | string;
  /**
   * The gap between the component and the label.
   * @default xxs
   */
  gap?: Spacing;
  /**
   * The icon to display inside the component.
   */
  icon?: ReactNode;
  label?: ReactNode;
  /**
   * The position of the label.
   * @default 'bottom'
   */
  labelPosition?: Position;
  /**
   * The size of the component.
   * @default 24
   */
  size?: number;
  /**
   * The inner circle color tone.
   * @default 100
   */
  tone?: Tone;
}

export type StatusIndicatorProps = Simplify<
  OmitElementProps<HTMLDivElement, StatusIndicatorKnownProps>
>;

export const defaultProps = {
  borderRatio: 0.7,
  color: 'green',
  gap: 'xxs',
  labelPosition: 'bottom',
  tone: '100',
  size: 24,
} satisfies StatusIndicatorProps;

const StyledStatusIndicatorWrapper = styled(
  'div',
  getStyledOptions(),
)<Required<Pick<StatusIndicatorProps, 'gap' | 'labelPosition'>>>(props => {
  const { gap, labelPosition } = props;
  const { spacing } = getTheme(props);

  const flexDirectionMap = {
    bottom: 'column',
    left: 'row-reverse',
    right: 'row',
    top: 'column-reverse',
  };

  return css`
    align-items: center;
    display: flex;
    flex-direction: ${flexDirectionMap[labelPosition]};
    gap: ${spacing[gap]};
    justify-content: center;
  `;
});

const StyledStatusIndicator = styled(
  'div',
  getStyledOptions(),
)<SetRequired<StatusIndicatorProps, 'borderRatio' | 'color' | 'size' | 'tone'>>(props => {
  const { borderRatio, color, size, tone } = props;
  const { white, ...theme } = getTheme(props);
  const { mainColor, variant } = getColorTokens(color, null, theme);
  let centerBg: string;

  if (variant) {
    ({ mainColor: centerBg } = getColorTokens(`${variant}.${tone}`, null, theme));
  } else {
    centerBg = getColorWithTone(mainColor, tone);
  }

  const innerSize = size * borderRatio < size ? size * borderRatio : size;

  return css`
    align-items: center;
    background-color: ${mainColor};
    border-radius: 50%;
    display: inline-flex;
    height: ${px(size)};
    justify-content: center;
    line-height: 1;
    position: relative;
    width: ${px(size)};
    ${marginStyles(props)};

    &:before {
      background-color: ${centerBg};
      border-radius: 50%;
      content: '';
      display: block;
      height: ${px(innerSize)};
      position: absolute;
      width: ${px(innerSize)};
    }

    > * {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  `;
});

export function StatusIndicator(props: StatusIndicatorProps) {
  const { gap, icon, label, labelPosition, ...rest } = mergeProps(defaultProps, props);
  const labelId = useId();

  const content: Record<string, ReactNode> = {};

  if (label) {
    content.label = isValidElement(label) ? (
      cloneElement(label as ReactElement, { id: labelId })
    ) : (
      <Text data-component-name="StatusIndicatorLabel" id={labelId} size="md">
        {label}
      </Text>
    );
  }

  return (
    <StyledStatusIndicatorWrapper
      data-component-name="StatusIndicator"
      gap={gap}
      labelPosition={labelPosition}
    >
      <StyledStatusIndicator {...rest}>{icon}</StyledStatusIndicator>
      {content.label}
    </StyledStatusIndicatorWrapper>
  );
}

StatusIndicator.displayName = 'StatusIndicator';
