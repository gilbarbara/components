import { Children, isValidElement } from 'react';

import {
  clearNumber,
  createMediaQuery,
  formatKebabCaseToCamelCase,
  getMediaQueries,
  isCSSUnit,
  mergeTheme,
  recursiveChildrenEnhancer,
  responsive,
} from '~/modules/helpers';

import { MenuItem, MenuSeparator } from '~/components/Menu';

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

describe('formatKebabCaseToCamelCase', () => {
  it.each([
    { value: 'background-color', expected: 'backgroundColor' },
    { value: 'border-bottom-left-radius', expected: 'borderBottomLeftRadius' },
    { value: 'snake_case', expected: 'snake_case' },
    { value: 'space case', expected: 'space case' },
    { value: 'camelCase', expected: 'camelCase' },
  ])(`should return $expected for $value`, ({ expected, value }) => {
    expect(formatKebabCaseToCamelCase(value)).toBe(expected);
  });
});

describe('getMediaQueries', () => {
  it('should return properly', () => {
    expect(getMediaQueries()).toMatchSnapshot();
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
      [<MenuItem>One</MenuItem>, <MenuItem>Two</MenuItem>, <MenuSeparator />],
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
