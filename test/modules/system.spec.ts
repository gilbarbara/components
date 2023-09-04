import {
  alignStyles,
  baseStyles,
  borderStyles,
  colorStyles,
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

describe('alignStyles', () => {
  it('should return properly', () => {
    expect(alignStyles({ align: 'center' })).toMatchSnapshot();
  });

  it('should return an empty object without the "align" prop', () => {
    expect(alignStyles({})).toMatchSnapshot();
  });
});

describe('baseStyles', () => {
  it('should return properly', () => {
    expect(baseStyles({})).toMatchSnapshot();
  });
});

describe('borderStyles', () => {
  it('should return properly for `true`', () => {
    expect(borderStyles({ border: true })).toMatchSnapshot();
  });

  it('should return properly for "horizontal"', () => {
    expect(borderStyles({ border: 'horizontal' })).toMatchSnapshot();
  });

  it('should return properly for "left"', () => {
    expect(borderStyles({ border: 'left' })).toMatchSnapshot();
  });

  it('should return properly with an array', () => {
    expect(
      borderStyles({
        border: [
          { side: 'left', size: 4, color: 'primary.100' },
          { side: 'top', size: 2, color: '#f04' },
        ],
      }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without the "border" prop', () => {
    expect(borderStyles({})).toMatchSnapshot();
  });
});

describe('colorStyles', () => {
  it('should return properly', () => {
    expect(colorStyles({ bg: 'primary' })).toMatchSnapshot();
  });

  it('should return an empty object without any "background" props', () => {
    expect(colorStyles({})).toMatchSnapshot();
  });
});

describe('displayStyles', () => {
  it('should return properly', () => {
    expect(displayStyles({ display: 'flex' })).toMatchSnapshot();
  });

  it('should return an empty object without the "display" prop', () => {
    expect(displayStyles({})).toMatchSnapshot();
  });
});

describe('flexBoxStyles', () => {
  it('should return properly', () => {
    expect(
      flexBoxStyles({ align: 'center', direction: 'column', gap: 20, wrap: 'wrap' }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without any "flexBox" props', () => {
    expect(flexBoxStyles({})).toMatchSnapshot();
  });
});

describe('flexItemStyles', () => {
  it('should return properly', () => {
    expect(flexItemStyles({ alignSelf: 'center', flex: true, fill: true })).toMatchSnapshot();
  });

  it('should return an empty object without any "flexItem" props', () => {
    expect(flexItemStyles({})).toMatchSnapshot();
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
    const { styles } = getDisableStyles({}, { isButton: true });

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
    expect(inputStyles({}, 'select').styles).toMatchSnapshot();
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
      layoutStyles({ display: 'flex', opacity: 1, pointerEvents: 'none', transition: 'all 0.2s' }),
    ).toMatchSnapshot();
  });

  it('should return an empty object without any "layout" props', () => {
    expect(layoutStyles({})).toMatchSnapshot();
  });
});

describe('marginStyles', () => {
  it('should return properly', () => {
    expect(marginStyles({ mx: 'auto' })).toMatchSnapshot();
  });

  it('should return an empty object without any "margin" props', () => {
    expect(marginStyles({})).toMatchSnapshot();
  });
});

describe('paddingStyles', () => {
  it('should return properly', () => {
    expect(paddingStyles({ pt: 'xs', px: 'md' })).toMatchSnapshot();
  });

  it('should return an empty object without any "padding" props', () => {
    expect(paddingStyles({})).toMatchSnapshot();
  });
});

describe('positioningStyles', () => {
  it('should return properly', () => {
    expect(positioningStyles({ bottom: 0, position: 'absolute' })).toMatchSnapshot();
  });

  it('should return an empty object without any "positioning" props', () => {
    expect(positioningStyles({})).toMatchSnapshot();
  });
});

describe('radiusStyles', () => {
  it('should return properly', () => {
    expect(radiusStyles({ radius: 'xxs' })).toMatchSnapshot();
  });

  it('should return an empty object without the "border-radius" prop', () => {
    expect(radiusStyles({})).toMatchSnapshot();
  });
});

describe('shadowStyles', () => {
  it('should return a "box-shadow" prop', () => {
    expect(shadowStyles({ shadow: 'mid' })).toMatchSnapshot();
  });

  it('should return a "filter" prop', () => {
    expect(shadowStyles({ shadow: 'low' }, true)).toMatchSnapshot();
  });

  it('should return an empty object without any "shadow" props', () => {
    expect(shadowStyles({})).toMatchSnapshot();
  });
});

describe('textStyles', () => {
  it('should return properly', () => {
    expect(textStyles({ bold: true, size: 'mid', textTransform: 'uppercase' })).toMatchSnapshot();
  });

  it('should return an empty object without any "textStyles" prop', () => {
    expect(textStyles({})).toMatchSnapshot();
  });
});
