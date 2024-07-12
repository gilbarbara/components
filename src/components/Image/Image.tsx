import { forwardRef, useMemo } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mergeProps, px } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { NativeImageProps, useImage, UseImageProps } from '~/hooks/useImage';
import { useTheme } from '~/hooks/useTheme';

import { getTheme } from '~/modules/helpers';
import { baseStyles, getStyledOptions, radiusStyles, shadowStyles } from '~/modules/system';

import { OmitElementProps, StyledProps, WithRadius, WithShadow } from '~/types';

export interface ImageKnownProps extends StyledProps, UseImageProps, WithRadius, WithShadow {
  /**
   * The image `alt` attribute.
   */
  alt: NativeImageProps['alt'];
  /**
   * Disable the loading skeleton.
   * @default false
   */
  disableSkeleton?: boolean;
  /**
   * A fallback image to show when the main image fails to load.
   */
  fallbackSrc?: string;
  height?: NativeImageProps['height'];
  /**
   * Controlled loading state.
   */
  isLoading?: boolean;
  /**
   * Remove the wrapper element. This will cause the image to be rendered as a direct child of the parent element.
   * If you set this prop as true neither the skeleton nor the zoom effect will work.
   * @default false
   */
  removeWrapper?: boolean;
  /**
   * The image `src` attribute.
   */
  src: string;
  width?: NativeImageProps['width'];
  /**
   * Zoom the image on hover.
   * @default false
   */
  zoomOnHover?: boolean;
  /**
   * The zoom percentage to apply on hover.
   * @default 1.25
   */
  zoomPercentage?: number;
}

export type ImageProps = Simplify<OmitElementProps<HTMLImageElement, ImageKnownProps>>;

export const defaultProps = {
  disableSkeleton: false,
  loading: 'lazy',
  removeWrapper: false,
  radius: 'none',
  zoomOnHover: false,
  zoomPercentage: 1.25,
} satisfies Omit<ImageProps, 'alt' | 'src'>;

const animation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  
  100% {
    transform: translateX(100%);
  }
`;

export const StyledImageWrapper = styled(
  'div',
  getStyledOptions(),
)<Omit<ImageProps, 'alt' | 'src'> & { maxWidth: string | number; showSkeleton: boolean }>(props => {
  const { maxWidth, radius, showSkeleton } = props;
  const { image } = getTheme(props);

  return css`
    ${baseStyles(props)};
    display: inline-flex;
    max-width: ${maxWidth};
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
    ${radiusStyles({ ...props, radius: radius ?? image.radius })};
    ${shadowStyles(props)};

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
});

export const StyledImage = styled.img<Omit<ImageProps, 'disableSkeleton' | 'fallbackSrc'>>(
  props => {
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
  },
);

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    crossOrigin,
    disableSkeleton,
    fallbackSrc,
    height,
    isLoading: isLoadingProp,
    loading,
    onError,
    onLoad,
    removeWrapper,
    sizes,
    src,
    srcSet,
    width,
    zoomOnHover,
    ...rest
  } = mergeProps(defaultProps, props);
  const { getDataAttributes } = useTheme();
  const { imageProps, status } = useImage({
    crossOrigin,
    loading,
    onError,
    onLoad,
    sizes,
    src,
    srcSet,
  });

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
      {...imageProps}
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
