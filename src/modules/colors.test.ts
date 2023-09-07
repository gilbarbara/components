import { getColorTokens, getColorWithTone } from '~/modules/colors';

describe('getColorWithTone', () => {
  it.each([
    { color: '#f04', tone: '100', expected: '#ffccda' },
    { color: 'rgb(255, 0, 68)', tone: '100', expected: '#ffccda' },
    { color: 'hsl(344, 100, 50)', tone: '100', expected: '#ffccda' },
    { color: 'teal', tone: '200', expected: '#99ffff' },
    { color: 'red', tone: '50', expected: '#ffe6e6' },
    { color: '#000', tone: '100', expected: '#e6e6e6' },
  ] as const)(`should return $expected for $color/$tone`, ({ color, expected, tone }) => {
    expect(getColorWithTone(color, tone)).toBe(expected);
  });
});

describe('getColorTokens', () => {
  it.each([
    { mainColor: 'black', textColor: null, expected: { mainColor: '#000', textColor: '#fff' } },
    {
      mainColor: 'black',
      textColor: '#ff0044',
      expected: { mainColor: '#000', textColor: '#ff0044' },
    },
    { mainColor: 'white', textColor: null, expected: { mainColor: '#fff', textColor: '#000' } },
    {
      mainColor: 'white',
      textColor: 'gray.900',
      expected: { mainColor: '#fff', textColor: '#1a1a1a' },
    },
    {
      mainColor: 'primary',
      textColor: null,
      expected: { mainColor: '#3030e8', textColor: '#ffffff', variant: 'primary' },
    },
    {
      mainColor: 'secondary',
      textColor: null,
      expected: { mainColor: '#2a5d65', textColor: '#ffffff', variant: 'secondary' },
    },
    {
      mainColor: 'gray',
      textColor: null,
      expected: { mainColor: '#999999', textColor: '#000000', variant: 'gray' },
    },
    {
      mainColor: 'red',
      textColor: null,
      expected: { mainColor: '#ff5e5e', textColor: '#000000', variant: 'red' },
    },
    {
      mainColor: 'orange',
      textColor: null,
      expected: { mainColor: '#ff995d', textColor: '#000000', variant: 'orange' },
    },
    {
      mainColor: 'yellow',
      textColor: null,
      expected: { mainColor: '#ffe166', textColor: '#000000', variant: 'yellow' },
    },
    {
      mainColor: 'green',
      textColor: null,
      expected: { mainColor: '#58d063', textColor: '#000000', variant: 'green' },
    },
    {
      mainColor: 'teal',
      textColor: null,
      expected: { mainColor: '#38b2ac', textColor: '#000000', variant: 'teal' },
    },
    {
      mainColor: 'cyan',
      textColor: null,
      expected: { mainColor: '#0bc5ea', textColor: '#000000', variant: 'cyan' },
    },
    {
      mainColor: 'blue',
      textColor: null,
      expected: { mainColor: '#66a5ff', textColor: '#000000', variant: 'blue' },
    },
    {
      mainColor: 'indigo',
      textColor: null,
      expected: { mainColor: '#8a8fff', textColor: '#000000', variant: 'indigo' },
    },
    {
      mainColor: 'purple',
      textColor: null,
      expected: { mainColor: '#ad7bff', textColor: '#000000', variant: 'purple' },
    },
    {
      mainColor: 'pink',
      textColor: null,
      expected: { mainColor: '#ee63ab', textColor: '#000000', variant: 'pink' },
    },
    {
      mainColor: '#ff0044',
      textColor: null,
      expected: { mainColor: '#ff0044', textColor: '#ffffff' },
    },
    {
      mainColor: '#ff0044',
      textColor: 'gray.100',
      expected: { mainColor: '#ff0044', textColor: '#e6e6e6' },
    },
  ])(`should return properly for $mainColor/$textColor`, ({ expected, mainColor, textColor }) => {
    expect(getColorTokens(mainColor, textColor)).toEqual(expected);
  });

  it('should return the default value', () => {
    // @ts-ignore
    expect(getColorTokens()).toEqual({
      mainColor: '#3030e8',
      textColor: '#ffffff',
      variant: 'primary',
    });
  });
});
