import { renderHook } from '@testing-library/react';

import * as defaultTheme from '~/modules/theme';

import { useComponentProps } from './useComponentProps';

describe('useComponentProps', () => {
  it('should return properly', () => {
    const { result } = renderHook(() => useComponentProps({ as: 'button' }));
    const { componentProps, getDataAttributes } = result.current;

    expect(getDataAttributes('Button')).toEqual({
      'data-component-name': 'Button',
    });

    expect(componentProps).toEqual({ as: 'button', theme: { ...defaultTheme } });
  });
});
