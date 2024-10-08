import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getColorTokens } from '~/modules/colors';
import { getStyledOptions } from '~/modules/system';

import { WithTheme } from '~/types';

import { LoaderComponentProps } from './useLoader';

const grow = ({ size = 32 }: LoaderComponentProps) => keyframes`
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
      animation: ${grow(props)} 1.15s infinite cubic-bezier(0.2, 0.6, 0.36, 1);
      border: 0 solid ${mainColor};
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

export default function LoaderGrow(props: LoaderComponentProps) {
  const { getDataAttributes } = props;

  return (
    <StyledLoaderGrow {...getDataAttributes('LoaderGrow')} {...props}>
      <div />
    </StyledLoaderGrow>
  );
}

LoaderGrow.displayName = 'LoaderGrow';
