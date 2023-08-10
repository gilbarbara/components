import { Children, isValidElement } from 'react';
import { Box } from 'components/Box';
import { MenuDivider, MenuItem } from 'components/Menu';
import {
  clearNumber,
  createMediaQuery,
  getColorVariant,
  getElementProperty,
  getMediaQueries,
  getTheme,
  isCSSUnit,
  mergeTheme,
  recursiveChildrenEnhancer,
  responsive,
} from 'modules/helpers';

describe('clearNumber', () => {
  it('should return properly', () => {
    expect(clearNumber('AD1021')).toBe('1021');
  });
});

describe('createMediaQuery', () => {
  it('should return properly', () => {
    const mediaQueries = getMediaQueries();

    expect(createMediaQuery('_', mediaQueries)).toBeUndefined();
    expect(createMediaQuery('sm', mediaQueries)).toBe('@media screen and (min-width: 400px)');
    expect(createMediaQuery('600px', mediaQueries)).toBe('@media screen and (min-width: 600px)');
  });
});

describe('getColorVariant', () => {
  it('should return properly', () => {
    expect(getColorVariant('black')).toEqual({ bg: '#000', color: '#fff' });
    expect(getColorVariant('black', 'lightest')).toEqual({ bg: '#000', color: '#fff' });

    expect(getColorVariant('white')).toEqual({ bg: '#fff', color: '#000' });
    expect(getColorVariant('white', 'darkest')).toEqual({ bg: '#fff', color: '#000' });

    expect(getColorVariant('yellow')).toEqual({ bg: '#ffe166', color: '#000000' });
    expect(getColorVariant('yellow', 'lightest')).toEqual({ bg: '#fffbeb', color: '#000000' });
    expect(getColorVariant('yellow', 'lighter')).toEqual({ bg: '#fff7d6', color: '#000000' });
    expect(getColorVariant('yellow', 'light')).toEqual({ bg: '#ffeb99', color: '#000000' });
    expect(getColorVariant('yellow', 'dark')).toEqual({ bg: '#fac900', color: '#000000' });
    expect(getColorVariant('yellow', 'darker')).toEqual({ bg: '#a18100', color: '#ffffff' });
    expect(getColorVariant('yellow', 'darkest')).toEqual({ bg: '#6b5600', color: '#ffffff' });
    // @ts-ignore
    expect(getColorVariant()).toEqual({ bg: '#3030e8', color: '#ffffff' });
  });
});

describe('getElementProperty', () => {
  it.each([
    {
      input: (
        <Box>
          <div>
            <span>hey</span>
            <time dateTime="2020-01-01">01/01/2020</time>
          </div>
        </Box>
      ),
      options: { type: 'time', property: 'dateTime' },
      expected: '2020-01-01',
    },
    {
      input: <div data-name="John Smith">John</div>,
      options: { type: 'div', property: 'data-name' },
      expected: 'John Smith',
    },
    {
      input: <div>John</div>,
      options: { type: 'div' },
      expected: 'John',
    },
    {
      input: <div>John</div>,
      options: { type: 'span' },
      expected: null,
    },
    {
      input: <div />,
      options: { type: 'div' },
      expected: null,
    },
  ])('should return $expected', ({ expected, input, options }) => {
    expect(getElementProperty(input, options)).toBe(expected);
  });
});

describe('getMediaQueries', () => {
  it('should return properly', () => {
    expect(getMediaQueries()).toMatchSnapshot();
  });
});

describe('getTheme', () => {
  it('should return the theme', () => {
    expect(getTheme({})).toMatchSnapshot();
  });
});

describe('isCSSUnit', () => {
  it.each([
    { value: '10', expected: false },
    { value: 15, expected: false },
    { value: '20px', expected: true },
    { value: '2em', expected: true },
    { value: '100vw', expected: true },
  ])('should return $expected for $value', ({ expected, value }) => {
    expect(isCSSUnit(value)).toBe(expected);
  });
});

describe('mergeTheme', () => {
  it('should return a modified theme', () => {
    expect(
      mergeTheme({
        colors: { primary: '#f04' },
        breakpoints: {
          sm: '100px',
        },
        darkColor: '#f04',
        fontWeights: {
          normal: 300,
          bold: 600,
        },
      }),
    ).toMatchSnapshot();
  });

  it('should return the default theme', () => {
    expect(mergeTheme()).toMatchSnapshot();
  });
});

describe('recursiveChildrenEnhancer', () => {
  it('should enhance the matching components', () => {
    const tree = recursiveChildrenEnhancer(
      [<MenuItem>One</MenuItem>, <MenuItem>Two</MenuItem>, <MenuDivider />],
      { name: 'SuperItem' },
      { componentType: MenuItem },
    );

    expect(
      Children.map(tree, child => (isValidElement(child) ? child.props?.name : child)),
    ).toEqual(['SuperItem', 'SuperItem']);
  });
});

describe('responsive', () => {
  it('should return proper styles', () => {
    const response = responsive({ _: { width: 120 }, md: { width: 200 } });

    expect(response.styles).toMatchSnapshot();
  });
});
