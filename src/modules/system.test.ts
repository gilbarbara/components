import {
  alignStyles,
  baseStyles,
  borderStyles,
  boxStyles,
  colorStyles,
  dimensionStyles,
  displayStyles,
  flexBoxStyles,
  flexItemStyles,
  getContainerStyles,
  getDisableStyles,
  getOutlineStyles,
  getStyledOptions,
  inputStyles,
  isDarkMode,
  layoutStyles,
  marginStyles,
  paddingStyles,
  positioningStyles,
  radiusStyles,
  shadowStyles,
  textStyles,
} from '~/modules/system';

import { BorderItemSide } from '~/types';

describe('alignStyles', () => {
  it('should return properly', () => {
    expect(alignStyles({ align: 'center' })).toMatchSnapshot();
  });

  it('should return an empty object without the "align" prop', () => {
    expect(alignStyles({})).toEqual({});
  });
});

describe('baseStyles', () => {
  it('should return properly', () => {
    expect(baseStyles({})).toMatchSnapshot();
  });
});

describe('borderStyles', () => {
  it.each<Array<BorderItemSide | true>>([
    [true],
    ['horizontal'],
    ['vertical'],
    ['start'],
    ['end'],
    ['left'],
    ['all'],
  ])(`should return properly for "%p"`, border => {
    expect(borderStyles({ border })).toMatchSnapshot();
  });

  it('should return properly with an array', () => {
    expect(
      borderStyles({
        border: [{ side: 'left', size: 4, color: 'primary.100' }, { side: 'top' }],
      }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without the "border" prop', () => {
    expect(borderStyles({})).toEqual({});
  });
});

describe('boxStyles', () => {
  it('should return properly', () => {
    expect(boxStyles({ bg: 'primary', shadow: 'mid' })).toMatchSnapshot();
  });
});

describe('colorStyles', () => {
  it('should return properly with "background" and "color"', () => {
    expect(colorStyles({ bg: 'primary', color: 'green.100' })).toMatchSnapshot();
  });

  it('should return properly with just "color"', () => {
    expect(colorStyles({ color: 'red.300' })).toMatchSnapshot();
  });

  it('should return an empty object without "color" props', () => {
    expect(colorStyles({})).toEqual({});
  });
});

describe('displayStyles', () => {
  it('should return properly', () => {
    expect(displayStyles({ display: 'flex' })).toMatchSnapshot();
  });

  it('should return an empty object without the "display" prop', () => {
    expect(displayStyles({})).toEqual({});
  });
});

describe('dimensionStyles', () => {
  it('should return properly', () => {
    expect(dimensionStyles({ height: 200, maxWidth: '100%', width: 480 })).toMatchSnapshot();
  });

  it('should return an empty object', () => {
    expect(dimensionStyles({})).toEqual({});
  });
});

describe('flexBoxStyles', () => {
  it('should return properly', () => {
    expect(
      flexBoxStyles({ align: 'center', direction: 'column', gap: 20, wrap: 'wrap' }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "flexBox" props', () => {
    expect(flexBoxStyles({})).toEqual({});
  });
});

describe('flexItemStyles', () => {
  it('should return properly', () => {
    expect(flexItemStyles({ alignSelf: 'center', flex: true, fill: true })).toMatchSnapshot();
  });

  it('should return properly with flex string', () => {
    expect(flexItemStyles({ alignSelf: 'center', flex: 'grow', fill: true })).toMatchSnapshot();
  });

  it('should return properly with flex object', () => {
    expect(
      flexItemStyles({ alignSelf: 'center', flex: { grow: 1, shrink: 1 }, fill: true }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "flexItem" props', () => {
    expect(flexItemStyles({})).toEqual({});
  });
});

describe('getContainerStyles', () => {
  it('should return properly', () => {
    const { styles } = getContainerStyles({});

    expect(styles).toMatchSnapshot();
  });

  it('should return properly with "responsive: false"', () => {
    const { styles } = getContainerStyles({}, { responsive: false });

    expect(styles).toMatchSnapshot();
  });

  it('should return properly with "verticalPadding: true"', () => {
    const { styles } = getContainerStyles({}, { verticalPadding: true });

    expect(styles).toMatchSnapshot();
  });
});

describe('getDisableStyles', () => {
  it('should return properly', () => {
    const { styles } = getDisableStyles({});

    expect(styles).toMatchSnapshot();
  });

  it('should return properly with "isButton: true"', () => {
    const { styles } = getDisableStyles({ invert: true }, { isButton: true });

    expect(styles).toMatchSnapshot();
  });

  it('should return properly with "hasPlaceholder: true"', () => {
    const { styles } = getDisableStyles({}, { hasPlaceholder: true });

    expect(styles).toMatchSnapshot();
  });
});

describe('getOutlineStyles', () => {
  it('should return properly', () => {
    expect(getOutlineStyles('#000')).toEqual({
      boxShadow: '0 0 0 3px rgba(0,0,0,0.6)',
      outline: 'none',
      zIndex: 10,
    });
  });
});

describe('getStyledOptions', () => {
  it.each([
    ['onChange', true],
    ['color', false],
  ])('should forward %p: %p', (prop, expected) => {
    const { shouldForwardProp } = getStyledOptions();

    expect(shouldForwardProp(prop)).toBe(expected);
  });
});

describe('inputStyles', () => {
  it('should return custom styles for "input"', () => {
    expect(
      inputStyles({ borderless: true, large: true, prefixSpacing: true }, 'input').styles,
    ).toMatchSnapshot();
  });

  it('should return the default styles for "select"', () => {
    expect(inputStyles({ multiple: false }, 'select').styles).toMatchSnapshot();
  });

  it('should return the default styles for "textarea"', () => {
    expect(inputStyles({ suffixSpacing: true }, 'textarea').styles).toMatchSnapshot();
  });
});

describe('isDarkMode', () => {
  it('should return the default', () => {
    expect(isDarkMode({})).toBe(false);
  });

  it('should return true', () => {
    expect(isDarkMode({ theme: { darkMode: true } })).toBe(true);
  });
});

describe('layoutStyles', () => {
  it('should return properly', () => {
    expect(
      layoutStyles({
        display: 'flex',
        height: 100,
        maxHeight: 80,
        maxWidth: 80,
        minHeight: 20,
        minWidth: 20,
        opacity: 1,
        pointerEvents: 'none',
        transition: 'all 0.2s',
        width: 100,
      }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "layout" props', () => {
    expect(layoutStyles({})).toEqual({});
  });
});

describe('marginStyles', () => {
  it('should return properly', () => {
    expect(
      marginStyles({
        margin: 'md',
        my: 'xs',
        mx: 'auto',
      }),
    ).toMatchSnapshot();
  });

  it('should return properly for side values', () => {
    expect(
      marginStyles({
        mb: 'lg',
        ml: 'auto',
        mr: 'auto',
        mt: 'xl',
      }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "margin" props', () => {
    expect(marginStyles({})).toEqual({});
  });
});

describe('paddingStyles', () => {
  it('should return properly', () => {
    expect(
      paddingStyles({
        padding: 'md',
        py: 'xs',
        px: 'lg',
      }),
    ).toMatchSnapshot();
  });

  it('should return properly for side values', () => {
    expect(
      paddingStyles(
        {
          pb: 'lg',
          pl: 'xs',
          pr: 'sm',
          pt: 'xl',
        },
        true,
      ),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "padding" props', () => {
    expect(paddingStyles({})).toEqual({});
  });
});

describe('positioningStyles', () => {
  it('should return properly', () => {
    expect(
      positioningStyles({ bottom: 0, left: 0, right: 0, top: 0, position: 'absolute' }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "positioning" props', () => {
    expect(positioningStyles({})).toEqual({});
  });
});

describe('radiusStyles', () => {
  it('should return properly with a string', () => {
    expect(radiusStyles({ radius: 'xxs' })).toMatchSnapshot();
  });

  it('should return properly with an object', () => {
    expect(
      radiusStyles({ radius: { bottom: 'xs', left: 'md', right: 'lg', top: 'xl' } }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without the "border-radius" prop', () => {
    expect(radiusStyles({})).toEqual({});
  });
});

describe('shadowStyles', () => {
  const theme = { darkMode: true };

  it.each([
    { name: 'box-shadow (light)', props: { shadow: 'low' as const } },
    { name: 'box-shadow (dark)', props: { theme, shadow: 'mid' as const } },
    { name: 'filter (light)', props: { theme, shadow: 'low' as const }, useFilter: true },
    { name: 'filter (dark)', props: { theme, shadow: 'high' as const }, useFilter: true },
  ])(`should return properly for "$name"`, ({ props, useFilter }) => {
    expect(shadowStyles(props, useFilter)).toMatchSnapshot();
  });

  it('should return an empty object without "shadow" props', () => {
    expect(shadowStyles({})).toEqual({});
  });
});

describe('textStyles', () => {
  it('should return properly', () => {
    expect(
      textStyles({ bold: true, italic: true, size: 'sm', textTransform: 'uppercase' }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "textStyles" prop', () => {
    expect(textStyles({})).toEqual({});
  });
});
