import { alignStyles, getContainerStyles, getStyledOptions, isDarkMode } from 'modules/system';

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

describe('getStyledOptions', () => {
  it.each([
    ['onChange', true],
    ['color', false],
  ])('should forward %p: %p', (prop, expected) => {
    const { shouldForwardProp } = getStyledOptions();

    expect(shouldForwardProp(prop)).toBe(expected);
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

describe('alignStyles', () => {
  it('should return properly', () => {
    expect(alignStyles({ align: 'center' })).toMatchSnapshot();
  });

  it('should return an empty object without the "align" prop', () => {
    expect(alignStyles({})).toMatchSnapshot();
  });
});
