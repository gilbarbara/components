import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ImgHTMLAttributes, SyntheticEvent } from 'react';

type ImageEvent = SyntheticEvent<HTMLImageElement, Event>;

type Status = 'loading' | 'failed' | 'pending' | 'loaded';

export type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;
export type UseImageReturn = ReturnType<typeof useImage>;

export interface UseImageProps {
  /**
   * Set the crossOrigin on the HTMLImageElement.
   */
  crossOrigin?: NativeImageProps['crossOrigin'];
  /**
   * A loading strategy to use for the image.
   */
  loading?: NativeImageProps['loading'];
  /**
   * Handler called when there was an error loading the image `src`
   */
  onError?: NativeImageProps['onError'];
  /**
   * Handler called when the image `src` has been loaded
   */
  onLoad?: NativeImageProps['onLoad'];
  /**
   * The image `sizes` attribute
   */
  sizes?: string;
  /**
   * The image `src` attribute
   */
  src?: string;
  /**
   * The image `srcset` attribute
   */
  srcSet?: string;
}

/**
 * React hook that loads an image in the browser,
 * and lets us know the `status`.
 */
export function useImage(props: UseImageProps) {
  const { crossOrigin, loading, onError, onLoad, sizes, src, srcSet } = props;

  const [status, setStatus] = useState<Status>('pending');

  useEffect(() => {
    setStatus(src ? 'loading' : 'pending');
  }, [src]);

  const imageRef = useRef<HTMLImageElement | null>();

  const load = useCallback(() => {
    /* c8 ignore next 3 */
    if (!src) {
      return;
    }

    flush();

    const img = new Image();

    img.src = src;

    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    if (srcSet) {
      img.srcset = srcSet;
    }

    if (sizes) {
      img.sizes = sizes;
    }

    if (loading) {
      img.loading = loading;
    }

    img.onload = event => {
      flush();
      setStatus('loaded');
      onLoad?.(event as unknown as ImageEvent);
    };

    img.onerror = error => {
      flush();
      setStatus('failed');
      onError?.(error as any);
    };

    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, loading]);

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };

  useLayoutEffect(() => {
    if (status === 'loading') {
      load();
    }

    return () => {
      flush();
    };
  }, [load, status]);

  return useMemo(
    () => ({
      imageProps: {
        crossOrigin,
        loading,
        onError,
        onLoad,
        sizes,
        srcSet,
      },
      status,
    }),
    [crossOrigin, loading, onError, onLoad, sizes, srcSet, status],
  );
}
