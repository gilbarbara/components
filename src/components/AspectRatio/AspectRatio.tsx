import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px, round } from '@gilbarbara/helpers';

import { getStyledOptions, getStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { AspectRatioProps, useAspectRatio } from './useAspectRatio';

export const StyledAspectRatio = styled('div', getStyledOptions())<AspectRatioProps & WithTheme>(
  css`
    display: flex;
    overflow: hidden;
    position: relative;
    width: 100%;

    &:before {
      content: '';
      display: flex;
      width: 100%;
    }

    > img,
    > video {
      object-fit: cover;
    }

    > * {
      align-self: center;
      display: flex;
      height: 100%;
      inset: 0;
      justify-content: center;
      position: absolute;
      width: 100%;
    }
  `,
  props => {
    const { maxWidth, ratio } = props;

    return css`
      max-width: ${maxWidth ? px(maxWidth) : 'none'};
      ${getStyles(props)};

      &:before {
        padding-bottom: ${`${round((1 / ratio) * 100)}%`};
      }
    `;
  },
);

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>((props, ref) => {
  const { componentProps, getDataAttributes } = useAspectRatio(props);

  return <StyledAspectRatio ref={ref} {...getDataAttributes('AspectRatio')} {...componentProps} />;
});

AspectRatio.displayName = 'AspectRatio';

export { type AspectRatioProps } from './useAspectRatio';
