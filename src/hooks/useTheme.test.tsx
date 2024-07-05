import { ThemeProvider } from '@emotion/react';
import { renderHook } from '@testing-library/react';

import { useTheme } from './useTheme';

describe('useTheme', () => {
  it('should return properly', () => {
    const { result } = renderHook(() => useTheme());
    const { getDataAttributes, theme } = result.current;

    expect(getDataAttributes('Button')).toEqual({
      'data-component-name': 'Button',
    });
    expect(theme).toMatchSnapshot();
  });

  it('should return a custom theme', () => {
    const customTheme = {
      dataAttributeName: 'testid',
      darkMode: true,
    };
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider theme={customTheme}>{children}</ThemeProvider>,
    });
    const { getDataAttributes, theme } = result.current;

    expect(getDataAttributes('Button')).toEqual({
      'data-testid': 'Button',
    });
    expect(theme.darkMode).toBeTrue();
  });
});
