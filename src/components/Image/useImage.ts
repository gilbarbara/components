import { mergeProps } from '@gilbarbara/helpers';
import { Simplify } from '@gilbarbara/types';

import { useComponentProps } from '~/hooks/useComponentProps';
import { NativeImageProps, useImage as useImageHook, UseImageProps } from '~/hooks/useImage';

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

export function useImage(props: ImageProps) {
  const { componentProps, getDataAttributes } = useComponentProps(props, defaultProps);
  const { imageProps: hookProps, status } = useImageHook(componentProps);
  const imageProps = mergeProps(hookProps, componentProps);

  return { componentProps: imageProps, getDataAttributes, status };
}
