import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { getColorVariant, getTheme, px } from '../modules/helpers';
import { getStyledOptions, isDarkMode } from '../modules/system';
import { LoaderProps } from '../types';

const grow = ({ size = 32 }: LoaderProps) => keyframes`
  0% {
    height: 0;
    width: 0;
  }

  30% {
    border-width: ${px(size && size / 2.5)};
    opacity: 1;
  }

  100% {
    border-width: 0;
    height: ${px(size)};
    opacity: 0;
    width: ${px(size)};
  }
`;

const StyledLoaderGrow = styled(
  'div',
  getStyledOptions(),
)<LoaderProps>(props => {
  const { block, color, shade, size = 32, variant } = props;
  const { darkColor, lightColor, spacing, variants } = getTheme(props);
  const darkMode = isDarkMode(props);

  let variantColor = darkMode ? lightColor : darkColor;

  if (variant) {
    variantColor = getColorVariant(variant, shade, variants).bg;
  }

  return css`
    display: ${block ? 'flex' : 'inline-flex'};
    height: ${px(size)};
    margin: ${block ? spacing.lg : 0} auto;
    position: relative;
    width: ${px(size)};

    > div {
      animation: ${grow(props)} 1.15s infinite cubic-bezier(0.2, 0.6, 0.36, 1);
      border: 0 solid ${color || variantColor};
      border-radius: 50%;
      height: 0;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 0;
    }
  `;
});

export default function LoaderGrow(props: LoaderProps) {
  return (
    <StyledLoaderGrow data-component-name="LoaderGrow" {...props}>
      <div />
    </StyledLoaderGrow>
  );
}
