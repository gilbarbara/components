import { forwardRef, useMemo } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { getStyledOptions, getStyles, radiusStyles, shadowStyles } from '~/modules/system';

import { WithTheme } from '~/types';

import { ImageProps, useImage } from './useImage';

const animation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  
  100% {
    transform: translateX(100%);
  }
`;

export const StyledImageWrapper = styled('div', getStyledOptions())<
  Omit<ImageProps, 'alt' | 'src'> & WithTheme & { maxWidth: string | number; showSkeleton: boolean }
>(
  {
    display: 'inline-flex',
    flexShrink: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  props => {
    const { showSkeleton, theme } = props;
    const { image } = theme;

    return css`
      ${getStyles(props)};

      ${showSkeleton &&
      css`
        background-color: ${image.skeletonBg};

        &:before {
          animation: ${animation} ${image.animationDuration}s infinite ${image.timingFunction};
          background-image: linear-gradient(
            to right,
            transparent 0,
            transparent 10%,
            ${image.skeletonColor} 25%,
            transparent 40%
          );
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
        }
      `}
    `;
  },
);

export const StyledImage = styled.img<
  Omit<ImageProps, 'disableSkeleton' | 'fallbackSrc'> & WithTheme
>(props => {
  const { isLoading, removeWrapper, zoomOnHover, zoomPercentage } = props;

  return css`
    max-width: 100%;
    object-fit: cover;
    opacity: ${isLoading ? 0 : 1};
    transition:
      opacity 0.3s,
      transform 0.3s;
    z-index: 10;
    ${removeWrapper && radiusStyles(props)};
    ${removeWrapper && shadowStyles(props)};

    ${zoomOnHover &&
    css`
      &:hover {
        transform: scale(${zoomPercentage});
      }
    `}
  `;
});

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const { componentProps, getDataAttributes, status } = useImage(props);
  const {
    disableSkeleton,
    fallbackSrc,
    height,
    isLoading: isLoadingProp,
    removeWrapper,
    src,
    width,
    zoomOnHover,
    ...rest
  } = componentProps;

  const isLoaded = status === 'loaded' && !isLoadingProp;
  const isLoading = isLoadingProp ?? ['pending', 'loading'].includes(status);
  const hasError = status === 'failed';

  const showFallback = (!src || !isLoaded) && !!fallbackSrc;
  const showSkeleton = !disableSkeleton && isLoading;

  const { h, w } = useMemo(() => {
    return {
      w: width ? px(width) : 'fit-content',
      h: height ? px(height) : 'auto',
    };
  }, [width, height]);

  const image = (
    <StyledImage
      ref={ref}
      {...componentProps}
      {...getDataAttributes('Image')}
      data-loaded={isLoaded}
      height={h}
      isLoading={isLoading}
      removeWrapper={removeWrapper}
      src={hasError && showFallback ? fallbackSrc : src}
      width={w}
      zoomOnHover={zoomOnHover && !removeWrapper}
      {...rest}
    />
  );

  if (removeWrapper) {
    return image;
  }

  return (
    <StyledImageWrapper
      {...getDataAttributes('ImageWrapper')}
      maxWidth={w}
      showSkeleton={showSkeleton}
      {...rest}
    >
      {image}
    </StyledImageWrapper>
  );
});

export { defaultProps, type ImageProps } from './useImage';
