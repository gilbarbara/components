import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';
import { fade } from 'colorizr';
import is from 'is-lite';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { LoaderComponentProps, LoaderSize } from './useLoader';

const animation = keyframes`
  0% {
    transform: translateX(-10%);
  }

  50% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-10%);
  }
`;

export const StyledLoaderPill = styled(
  'div',
  getStyledOptions(),
)<
  Omit<LoaderComponentProps, 'size'> &
    WithTheme & {
      height: number;
      width: number;
    }
>(props => {
  const { block, color = 'primary', height, theme, width } = props;
  const { darkMode, grayScale, spacing } = theme;

  const ratio = 0.16;
  const borderRadius = px(height / 2);
  const { mainColor } = getColorTokens(color, null, theme);

  return css`
    background-color: ${darkMode ? grayScale['700'] : grayScale['100']};
    border-radius: ${borderRadius};
    display: ${block ? 'flex' : 'inline-flex'};
    height: ${px(height === width ? Math.ceil(height * ratio) : height)};
    margin: ${block ? spacing.lg : 0} auto;
    overflow: hidden;
    position: relative;
    width: ${px(width)};

    div {
      animation: ${animation} 2s infinite ease-in-out;
      background-color: ${mainColor};
      border-radius: ${borderRadius};
      content: '';
      bottom: 0;
      display: block;
      left: -10%;
      position: absolute;
      top: 0;
      width: 70%;
      z-index: 10;
    }

    div:nth-of-type(2) {
      animation-delay: 0.04s;
      background-color: ${fade(mainColor, 30)};
      z-index: 5;
    }

    div:nth-of-type(3) {
      animation-delay: 0.05s;
      background-color: ${fade(mainColor, 20)};
      z-index: 4;
    }
  `;
});

export default function LoaderPill(props: LoaderComponentProps<LoaderSize>) {
  const { getDataAttributes, size } = props;

  const [width, height] = is.array(size) ? size : [size, size];

  return (
    <StyledLoaderPill {...getDataAttributes('LoaderPill')} height={height} width={width} {...props}>
      <div />
      <div />
      <div />
    </StyledLoaderPill>
  );
}

LoaderPill.displayName = 'LoaderPill';
