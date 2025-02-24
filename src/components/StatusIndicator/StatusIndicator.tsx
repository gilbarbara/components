import { cloneElement, isValidElement, ReactElement, ReactNode, useId } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { SetRequired } from '@gilbarbara/types';

import { getColorTokens, getColorWithTone } from '~/modules/colors';
import { getStyledOptions, marginStyles } from '~/modules/system';

import { Text } from '~/components/Text';

import { WithTheme } from '~/types';

import { StatusIndicatorProps, useStatusIndicator } from './useStatusIndicator';

const StyledStatusIndicatorWrapper = styled('div', getStyledOptions())<
  Required<Pick<StatusIndicatorProps, 'gap' | 'labelPosition'>> & WithTheme
>(
  {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },
  props => {
    const { gap, labelPosition, theme } = props;
    const { spacing } = theme;

    const flexDirectionMap = {
      bottom: 'column',
      left: 'row-reverse',
      right: 'row',
      top: 'column-reverse',
    };

    return css`
      flex-direction: ${flexDirectionMap[labelPosition]};
      gap: ${spacing[gap]};
    `;
  },
);

const StyledStatusIndicator = styled('div', getStyledOptions())<
  SetRequired<StatusIndicatorProps, 'borderRatio' | 'color' | 'size' | 'tone'> & WithTheme
>(
  {
    alignItems: 'center',
    borderRadius: '50%',
    display: 'inline-flex',
    justifyContent: 'center',
    lineHeight: 1,
    position: 'relative',
  },
  props => {
    const { borderRatio, color, size, theme, tone } = props;
    const { mainColor, variant } = getColorTokens(color, null, theme);
    let centerBg: string;

    if (variant) {
      ({ mainColor: centerBg } = getColorTokens(`${variant}.${tone}`, null, theme));
    } else {
      centerBg = getColorWithTone(mainColor, tone);
    }

    const innerSize = size * borderRatio < size ? size * borderRatio : size;

    return css`
      background-color: ${mainColor};
      height: ${px(size)};
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
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `;
  },
);

export function StatusIndicator(props: StatusIndicatorProps) {
  const { componentProps, getDataAttributes } = useStatusIndicator(props);
  const { gap, icon, label, labelPosition, ...rest } = componentProps;
  const labelId = useId();

  const content: Record<string, ReactNode> = {};

  if (label) {
    content.label = isValidElement(label) ? (
      cloneElement(label as ReactElement, { id: labelId })
    ) : (
      <Text {...getDataAttributes('StatusIndicatorLabel')} id={labelId} size="md">
        {label}
      </Text>
    );
  }

  return (
    <StyledStatusIndicatorWrapper
      {...getDataAttributes('StatusIndicator')}
      gap={gap}
      labelPosition={labelPosition}
      theme={rest.theme}
    >
      <StyledStatusIndicator {...rest}>{icon}</StyledStatusIndicator>
      {content.label}
    </StyledStatusIndicatorWrapper>
  );
}

StatusIndicator.displayName = 'StatusIndicator';

export { defaultProps, type StatusIndicatorProps } from './useStatusIndicator';
