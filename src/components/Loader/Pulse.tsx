import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { LoaderComponentProps } from './useLoader';

const pulse = ({ size = 32 }: LoaderComponentProps) => keyframes`
  0% {
    height: 0;
    left: ${px(size / 2)};
    opacity: 1;
    top: ${px(size / 2)};
    width: 0;
  }

  100% {
    height: ${px(size)};
    left: 0;
    opacity: 0;
    top: 0;
    width: ${px(size)};
  }
`;

const StyledLoaderPulse = styled(
  'div',
  getStyledOptions(),
)<LoaderComponentProps & WithTheme>(props => {
  const { block, color = 'primary', size = 32, theme } = props;
  const { spacing } = theme;

  const { mainColor } = getColorTokens(color, null, theme);

  return css`
    display: ${block ? 'flex' : 'inline-flex'};
    height: ${px(size)};
    margin: ${block ? spacing.lg : 0} auto;
    position: relative;
    width: ${px(size)};

    > div {
      animation: ${pulse(props)} 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      border: ${px(Math.round(size / 16))} solid ${mainColor};
      border-radius: 50%;
      height: 0;
      left: ${px(size / 2)};
      opacity: 1;
      position: absolute;
      top: ${px(size / 2)};
      transform-origin: center;
      width: 0;
    }

    > div:nth-of-type(2) {
      animation-delay: -0.5s;
    }
  `;
});

export default function LoaderPulse(props: LoaderComponentProps) {
  const { getDataAttributes } = props;

  return (
    <StyledLoaderPulse {...getDataAttributes('LoaderPulse')} {...props}>
      <div />
      <div />
    </StyledLoaderPulse>
  );
}

LoaderPulse.displayName = 'LoaderPulse';
