import {
  clearNumber,
  convertCamelCaseToKebabCase,
  convertKebabCaseToCamelCase,
  createMediaQuery,
  formatBreakpoints,
  getElement,
  getMediaQueries,
  isCSSUnit,
  mergeTheme,
  parseFloatNumber,
  responsive,
  stringifyCSSProperties,
} from '~/modules/helpers';
import * as defaultTheme from '~/modules/theme';

const canUseDOM = vi.fn(() => true);

vi.mock('@gilbarbara/helpers', async () => {
  const helpers = await vi.importActual('@gilbarbara/helpers');

  return {
    ...helpers,
    canUseDOM: vi.fn(() => canUseDOM()),
  };
});

describe('clearNumber', () => {
  it('should return properly', () => {
    expect(clearNumber('AD1021')).toBe('1021');
  });
});

describe('convertCamelCaseToKebabCase', () => {
  it.each([
    { value: 'backgroundColor', expected: 'background-color' },
    { value: 'borderBottomLeftRadius', expected: 'border-bottom-left-radius' },
    { value: 'snake_case', expected: 'snake_case' }, // unchanged, as it's not camelCase
    { value: 'space case', expected: 'space case' }, // unchanged, spaces are untouched
    { value: 'PascalCase', expected: '-pascal-case' }, // starts with a hyphen
    { value: 'camelCase', expected: 'camel-case' },
  ])(`should return $expected for $value`, ({ expected, value }) => {
    expect(convertCamelCaseToKebabCase(value)).toBe(expected);
  });
});

describe('convertKebabCaseToCamelCase', () => {
  it.each([
    { value: 'background-color', expected: 'backgroundColor' },
    { value: 'border-bottom-left-radius', expected: 'borderBottomLeftRadius' },
    { value: 'snake_case', expected: 'snake_case' },
    { value: 'space case', expected: 'space case' },
    { value: 'camelCase', expected: 'camelCase' },
  ])(`should return $expected for $value`, ({ expected, value }) => {
    expect(convertKebabCaseToCamelCase(value)).toBe(expected);
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

describe('formatBreakpoints', () => {
  it('should return properly', () => {
    expect(formatBreakpoints(defaultTheme)).toMatchSnapshot();
  });
});

describe('getElement', () => {
  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = ''; // Clean up DOM between tests
  });

  it('should return null if canUseDOM returns false', () => {
    canUseDOM.mockReturnValueOnce(false);

    const mockElement = document.createElement('div');

    expect(getElement(mockElement)).toBeNull();
  });

  it('should return the element from a RefObject', () => {
    const mockElement = document.createElement('div');
    const ref = { current: mockElement };

    expect(getElement(ref)).toBe(mockElement);
  });

  it('should return the element if passed directly', () => {
    const mockElement = document.createElement('div');

    expect(getElement(mockElement)).toBe(mockElement);
  });

  it('should return the element from a string selector', () => {
    const mockElement = document.createElement('div');

    mockElement.id = 'test-element';
    document.body.appendChild(mockElement);

    expect(getElement('#test-element')).toBe(mockElement);
  });

  it('should return null for an invalid string selector', () => {
    const element = getElement('#non-existent');

    expect(element).toBeNull();
  });

  it('should return null for a null target', () => {
    expect(getElement(null)).toBeNull();
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

describe('parseFloatNumber', () => {
  it('should return properly', () => {
    expect(parseFloatNumber('10px')).toBe(10);
    expect(parseFloatNumber('')).toBe(0);
  });
});

describe('responsive', () => {
  it('should return proper styles', () => {
    const response = responsive({ _: { width: 120 }, md: { width: 200 } });

    expect(response.styles).toMatchSnapshot();
  });
});

describe('stringifyCSSProperties', () => {
  it('should return properly', () => {
    expect(stringifyCSSProperties({ color: 'red', fontSize: '16px', opacity: 1 })).toBe(
      'color:red;font-size:16px;opacity:1;',
    );
  });

  it('should return an empty string with invalid parameter', () => {
    // @ts-expect-error
    expect(stringifyCSSProperties([])).toBe('');
    // @ts-expect-error
    expect(stringifyCSSProperties('')).toBe('');
  });
});
