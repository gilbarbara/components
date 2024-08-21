import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { rotate } from '~/modules/animations';
import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { LoaderComponentProps } from './useLoader';

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const StyledLoaderRotate = styled(
  'div',
  getStyledOptions(),
)<LoaderComponentProps & WithTheme>(props => {
  const { block, theme } = props;
  const { spacing } = theme;

  return css`
    display: ${block ? 'flex' : 'inline-flex'};
    margin: ${block ? spacing.lg : 0} auto;
    text-align: center;
  `;
});

const StyledLoaderRotateSVG = styled(
  'svg',
  getStyledOptions(),
)<{ size: number }>(props => {
  const { size } = props;

  return css`
    animation: ${rotate} 2s linear infinite;
    height: ${px(size)};
    margin: auto;
    transform-origin: center center;
    width: ${px(size)};
  `;
});

const StyledLoaderRotateCircle = styled('circle', getStyledOptions())<{ color: string }>`
  animation: ${dash} 1.5s infinite ease-in-out;
  stroke: ${props => props.color};
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
`;

export default function LoaderRotate(props: LoaderComponentProps) {
  const { color = 'primary', getDataAttributes, size = 32, theme } = props;
  const { mainColor } = getColorTokens(color, null, theme);

  return (
    <StyledLoaderRotate {...getDataAttributes('LoaderRotate')} {...props}>
      <StyledLoaderRotateSVG size={size} viewBox="25 25 50 50">
        <StyledLoaderRotateCircle
          color={mainColor}
          cx="50"
          cy="50"
          fill="none"
          r="20"
          strokeWidth={2}
        />
      </StyledLoaderRotateSVG>
    </StyledLoaderRotate>
  );
}

LoaderRotate.displayName = 'LoaderRotate';
