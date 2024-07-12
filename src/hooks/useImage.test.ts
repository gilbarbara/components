import { omit } from '@gilbarbara/helpers';
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import users from '~/stories/__fixtures__/users.json';

import { useImage } from './useImage';

const onError = vi.fn();
const onLoad = vi.fn();
let testType = 'load';

describe('useImage', () => {
  beforeAll(() => {
    global.Image = class {
      constructor() {
        setTimeout(() => {
          if (testType === 'load') {
            // @ts-expect-error Mocking the onload method
            this.onload();
          } else {
            // @ts-expect-error Mocking the onerror method
            this.onerror();
          }
        }, 100);
      }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should load the image', async () => {
    const props = {
      crossOrigin: 'anonymous',
      loading: 'lazy',
      srcSet: 'srcSet',
      sizes: 'sizes',
      onLoad,
      src: users[0].avatar,
    } as const;
    const { rerender, result } = renderHook(() => useImage(props), { initialProps: props });

    expect(result.current.status).toBe('loading');

    await vi.waitFor(() => {
      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(result.current.imageProps).toEqual(omit(props, 'src'));
    expect(result.current.status).toBe('loaded');
  });

  it('should fail to load the image', async () => {
    testType = 'error';

    const { rerender, result } = renderHook(() =>
      useImage({
        onError,
        src: 'https://example.com/image.jpg',
      }),
    );

    expect(result.current.status).toBe('loading');

    await vi.waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);
    });

    rerender();

    expect(result.current.status).toBe('failed');
  });

  it('should return the "pending" status if no src is provided', () => {
    const { rerender, result } = renderHook(() => useImage({}));

    expect(result.current.status).toBe('pending');

    rerender();

    expect(result.current.status).toBe('pending');
  });
});
