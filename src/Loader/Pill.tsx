import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { rgba } from 'polished';

import { getColorVariant, getTheme, px } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { LoaderProps } from '../types';

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
)<Omit<LoaderProps, 'type'>>(props => {
  const { block, color, shade, size = 128, variant } = props;
  const { darkColor, grayDark, grayLighter, lightColor, spacing, variants } = getTheme(props);
  const darkMode = isDarkMode(props);

  const ratio = 0.16;
  const borderRadius = px(size / 2);
  let variantColor = darkMode ? lightColor : darkColor;

  if (variant) {
    variantColor = getColorVariant(variant, shade, variants).bg;
  }

  return css`
    background-color: ${isDarkMode(props) ? grayDark : grayLighter};
    border-radius: ${borderRadius};
    display: ${block ? 'flex' : 'inline-flex'};
    height: ${px(Math.ceil(size * ratio))};
    margin: ${block ? spacing.lg : 0} auto;
    overflow: hidden;
    position: relative;
    width: ${px(size)};

    div {
      animation: ${animation} 2s infinite ease-in-out;
      background-color: ${color || variantColor};
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
      background-color: ${rgba(color || variantColor, 0.3)};
      z-index: 5;
    }

    div:nth-of-type(3) {
      animation-delay: 0.05s;
      background-color: ${rgba(color || variantColor, 0.2)};
      z-index: 4;
    }
  `;
});

export default function LoaderPill(props: LoaderProps) {
  return (
    <StyledLoaderPill data-component-name="LoaderPill" {...props}>
      <div />
      <div />
      <div />
    </StyledLoaderPill>
  );
}
