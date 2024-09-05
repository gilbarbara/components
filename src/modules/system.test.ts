import {
  alignStyles,
  baseStyles,
  borderStyles,
  colorStyles,
  dimensionStyles,
  flexBoxStyles,
  flexItemStyles,
  getContainerStyles,
  getDisableStyles,
  getOutlineStyles,
  getStyledOptions,
  getStyles,
  gridStyles,
  hoverStyles,
  inputStyles,
  layoutStyles,
  marginStyles,
  outlineStyles,
  paddingStyles,
  positioningStyles,
  radiusStyles,
  shadowStyles,
  textStyles,
} from '~/modules/system';
import * as theme from '~/modules/theme';

import { BorderItemSide } from '~/types';

const propsWithTheme = { theme };

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
    expect(baseStyles(theme)).toMatchSnapshot();
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
    expect(borderStyles({ border, theme })).toMatchSnapshot();
  });

  it('should return properly with an array', () => {
    expect(
      borderStyles({
        border: [{ side: 'left', size: 4, color: 'primary.100' }, { side: 'top' }],
        theme,
      }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without the "border" prop', () => {
    expect(borderStyles(propsWithTheme)).toEqual({});
  });
});

describe('colorStyles', () => {
  it('should return properly with "background" and "color"', () => {
    expect(colorStyles({ bg: 'primary', color: 'green.100', theme })).toMatchSnapshot();
  });

  it('should return properly with just "color"', () => {
    expect(colorStyles({ color: 'red.300', theme })).toMatchSnapshot();
  });

  it('should return an empty object without "color" props', () => {
    expect(colorStyles(propsWithTheme)).toEqual({});
  });
});

describe('dimensionStyles', () => {
  it('should return properly', () => {
    expect(
      dimensionStyles({
        height: 200,
        maxHeight: 100,
        maxWidth: '100%',
        minHeight: 40,
        minWidth: 290,
        width: 480,
      }),
    ).toMatchSnapshot();
  });

  it('should return an empty object', () => {
    expect(dimensionStyles({})).toEqual({});
  });
});

describe('flexBoxStyles', () => {
  it('should return properly', () => {
    expect(
      flexBoxStyles({ align: 'center', direction: 'column', gap: 20, wrap: 'wrap', theme }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "flexBox" props', () => {
    expect(flexBoxStyles(propsWithTheme)).toEqual({});
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
    const { styles } = getContainerStyles(propsWithTheme);

    expect(styles).toMatchSnapshot();
  });

  it('should return properly with "responsive: false"', () => {
    const { styles } = getContainerStyles(propsWithTheme, { responsive: false });

    expect(styles).toMatchSnapshot();
  });

  it('should return properly with "verticalPadding: true"', () => {
    const { styles } = getContainerStyles(propsWithTheme, { verticalPadding: true });

    expect(styles).toMatchSnapshot();
  });
});

describe('getDisableStyles', () => {
  it('should return properly', () => {
    const { styles } = getDisableStyles(propsWithTheme);

    expect(styles).toMatchSnapshot();
  });

  it('should return properly with "variation: clean"', () => {
    const { styles } = getDisableStyles({ variant: 'clean', theme }, { isButton: true });

    expect(styles).toMatchSnapshot();
  });

  it('should return properly with "isButton: true"', () => {
    const { styles } = getDisableStyles({ variant: 'bordered', theme }, { isButton: true });

    expect(styles).toMatchSnapshot();
  });

  it('should return properly with "hasPlaceholder: true"', () => {
    const { styles } = getDisableStyles(propsWithTheme, { hasPlaceholder: true });

    expect(styles).toMatchSnapshot();
  });
});

describe('getOutlineStyles', () => {
  it('should return properly', () => {
    expect(getOutlineStyles('#000')).toEqual({
      outline: 'rgba(0, 0, 0, 0.6) solid 3px',
      outlineOffset: '1px',
      zIndex: 10,
    });
  });

  it('should return values from a custom theme', () => {
    expect(
      getOutlineStyles('#000', {
        outlineOpacity: 0.8,
        outlineOffset: 2,
        outlineZIndex: 20,
        outlineWidth: '4px',
      }),
    ).toEqual({
      outline: 'rgba(0, 0, 0, 0.2) solid 4px',
      outlineOffset: '2px',
      zIndex: 20,
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

describe('getStyles', () => {
  it('should return properly', () => {
    expect(
      getStyles({
        bg: 'primary',
        bold: true,
        border: true,
        busy: true,
        color: 'white',
        direction: 'column' as const,
        display: 'flex',
        flex: true,
        gap: 'sm',
        height: 200,
        lineHeight: 1.2,
        m: 'md' as const,
        p: 'sm' as const,
        radius: 'md' as const,
        shadow: 'mid' as const,
        variant: 'solid' as const,
        width: '100px',
        zIndex: 10,
        theme,
      }),
    ).toMatchSnapshot();
  });

  it('should return an object with the basic styles', () => {
    expect(getStyles({ theme })).toMatchSnapshot();
  });
});

describe('gridStyles', () => {
  it('should return properly', () => {
    expect(
      gridStyles({
        area: '1 / 1 / 2 / 2',
        autoColumns: 'auto',
        autoFlow: 'row',
        autoRows: 'auto',
        column: '1 / 2',
        columnEnd: 'auto',
        columnGap: 'sm',
        columnStart: 'auto',
        grid: 'auto-flow / 1fr 1fr 1fr',
        row: '2 / -1',
        rowEnd: 'span 3',
        rowGap: 'md',
        rowStart: 'auto',
        template: '"a a a" 40px "b c c" 40px "b c c" 40px / 1fr 1fr 1fr',
        templateAreas: 'a b c',
        templateColumns: '1fr 60px',
        templateRows: '1fr 2fr 1fr',
        theme,
      }),
    ).toMatchSnapshot();
  });

  it('should return an empty object with any props', () => {
    expect(gridStyles(propsWithTheme)).toEqual({});
  });
});

describe('hoverStyles', () => {
  it('should return "backgroundColor" and "borderColor"', () => {
    expect(hoverStyles({ bg: 'primary', theme })).toMatchSnapshot();
  });

  it('should return "borderColor" and "color" for variant "bordered', () => {
    expect(hoverStyles({ bg: 'primary', variant: 'bordered', theme })).toMatchSnapshot();
  });

  it('should return only and "color" for variant "clean', () => {
    expect(hoverStyles({ bg: 'primary', variant: 'clean', theme })).toMatchSnapshot();
  });

  it('should return an empty object with "disabled"', () => {
    expect(hoverStyles({ bg: 'primary', disabled: true, theme })).toMatchSnapshot();
  });
});

describe('inputStyles', () => {
  it('should return custom styles for "input"', () => {
    expect(
      inputStyles({ borderless: true, prefixSpacing: true, theme }, 'input').styles,
    ).toMatchSnapshot();
  });

  it('should return the default styles for "select"', () => {
    expect(inputStyles({ multiple: false, theme }, 'select').styles).toMatchSnapshot();
  });

  it('should return the default styles for "textarea"', () => {
    expect(inputStyles({ suffixSpacing: true, theme }, 'textarea').styles).toMatchSnapshot();
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
        theme,
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
        theme,
      }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "margin" props', () => {
    expect(marginStyles(propsWithTheme)).toEqual({});
  });
});

describe('outlineStyles', () => {
  it('should return properly', () => {
    expect(outlineStyles('#f04', theme).styles).toMatchSnapshot();
  });
});

describe('paddingStyles', () => {
  it('should return properly', () => {
    expect(
      paddingStyles({
        padding: 'md',
        py: 'xs',
        px: 'lg',
        theme,
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
          theme,
        },
        true,
      ),
    ).toMatchSnapshot();
  });

  it('should handle zero values', () => {
    expect(
      paddingStyles({
        p: 0,
        pb: 0,
        pl: 0,
        pr: 0,
        pt: 0,
        theme,
      }),
    ).toMatchSnapshot();
  });

  it('should handle zero values for "px" and "py"', () => {
    expect(
      paddingStyles({
        px: 0,
        py: 0,
        theme,
      }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "padding" props', () => {
    expect(paddingStyles(propsWithTheme)).toEqual({});
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
    expect(radiusStyles({ radius: 'xxs', theme })).toMatchSnapshot();
  });

  it('should return properly with an object', () => {
    expect(
      radiusStyles({ radius: { bottom: 'xs', left: 'md', right: 'lg', top: 'xl' }, theme }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without the "border-radius" prop', () => {
    expect(radiusStyles(propsWithTheme)).toEqual({});
  });
});

describe('shadowStyles', () => {
  it.each([
    { name: 'light', props: { shadow: 'low' as const, theme } },
    {
      name: 'dark',
      props: { shadow: 'mid' as const, theme: { ...theme, darkMode: true } },
    },
  ])(`should return properly for "$name"`, ({ props }) => {
    expect(shadowStyles(props)).toMatchSnapshot();
  });

  it('should return an empty object without "shadow" props', () => {
    expect(shadowStyles(propsWithTheme)).toEqual({});
  });
});

describe('textStyles', () => {
  it('should return properly', () => {
    expect(
      textStyles({ bold: true, italic: true, size: 'sm', textTransform: 'uppercase', theme }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without "textStyles" prop', () => {
    expect(textStyles(propsWithTheme)).toEqual({});
  });
});
